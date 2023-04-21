import { ok } from 'oazapfts';
import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Button, Divider, Image, Layout, Message, toast, Typography } from '@bangumi/design';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

import { useWikiContext } from '../wiki';
import style from './common.module.less';

interface WikiCoverItemProp {
  id: number;
  thumbnail: string;
  creator: {
    username: string;
    nickname: string;
  };
  voted: boolean;
  onCommentUpdate: () => Promise<unknown>;
}

const WikiCoverItem: React.FC<WikiCoverItemProp> = ({
  id,
  thumbnail,
  creator,
  voted,
  onCommentUpdate,
}) => {
  const { subjectId } = useWikiContext();
  const [loadingVote, setLoadingVote] = useState(false);
  const url = getUserProfileLink(creator.username);

  const voteCover = async (coverId: number, voted: boolean) => {
    if (!coverId || isNaN(coverId)) {
      toast('封面 ID 有误！', { type: 'error' });
    }
    setLoadingVote(true);
    try {
      const res = await (voted
        ? ozaClient.unvoteSubjectCover(subjectId, coverId)
        : ozaClient.voteSubjectCover(subjectId, coverId));
      if (res.status === 200) {
        toast('操作成功！');
        onCommentUpdate();
      } else {
        toast(res.data.message, { type: 'error' });
        console.error(res.data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast(err.message, { type: 'error' });
        console.error(err);
      }
    } finally {
      setLoadingVote(false);
    }
  };

  return (
    <div className={style.uploadImgCoverItem}>
      <div className={style.uploadImgCoverItemImg}>
        <Image src={thumbnail} alt={`cover-${id}`} />
      </div>
      <div className={style.uploadImgCoverItemInfo}>
        <span>by</span>
        <Typography.Link to={url} fontWeight='bold'>
          {creator.nickname}
        </Typography.Link>
      </div>
      <Button
        size='small'
        type='text'
        disabled={loadingVote}
        onClick={() => {
          voteCover(id, voted);
        }}
      >
        {loadingVote ? '···' : voted ? '撤消' : '投票'}
      </Button>
    </div>
  );
};

const WikiUploadImgPage: React.FC = () => {
  const { subjectId } = useWikiContext();

  const { data, mutate } = useSWR(
    `/p1/wiki/subjects/${subjectId}/covers`,
    async () => ok(ozaClient.listSubjectCovers(subjectId)),
    { suspense: true },
  );

  const { covers, current } = data;

  const uploadNameInitial = '尚未选择任何本地文件';
  const [uploadName, setUploadName] = useState(uploadNameInitial);
  const [uploadContent, setUploadContent] = useState('');
  const [loadingUpload, setloadingUpload] = useState(false);
  const uploaderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!uploaderRef.current) {
      console.error('uploaderRef获取为空！');
      return;
    }
    const uploaderRefValue = uploaderRef.current;
    // 上传文件和前置校验
    const readImage = () => {
      const img = uploaderRefValue.files?.[0];
      const reader = new FileReader();
      if (!img) {
        toast('图片不存在', { type: 'error' });
        return;
      }
      if (img.size >= 4 * 1024 * 1024) {
        toast('上传图片原始大小应该小于4mb', { type: 'error' });
        return;
      }
      reader.addEventListener('load', () => {
        const code = reader?.result as string;
        // 图片转base64
        if (!code) {
          toast('解析图片失败！', { type: 'error' });
          setUploadName(uploadNameInitial);
          return;
        }
        setUploadName(getShortName(img.name));
        setUploadContent(code.replace(/^data:image\/\w+;base64,/, ''));
      });
      reader.addEventListener('error', () => {
        toast('解析图片失败！', { type: 'error' });
        setUploadName(uploadNameInitial);
      });
      reader.readAsDataURL(img);
      setUploadName('加载中…');
    };
    uploaderRefValue.addEventListener('change', readImage);

    return () => {
      uploaderRefValue.removeEventListener('change', readImage);
    };
  });

  const uploadCover = async () => {
    // 可能的用户错误类型
    const userErrorCodeObj: Record<string, string> = {
      NOT_ALLOWED: '无操作该条目的权限！',
      IMAGE_FILE_TOO_LARGE: '上传文件过大！',
      IMAGE_FORMAT_NOT_SUPPORT: '上传文件格式仅限：jpeg, jpg, png, webp',
    };
    if (!uploadContent) {
      toast('未找到上传图片！', { type: 'error' });
      return;
    }
    try {
      setloadingUpload(true);
      const res = await ozaClient.uploadSubjectCover(subjectId, { content: uploadContent });
      if (res.status === 200) {
        setUploadContent('');
        setUploadName(uploadNameInitial);
        toast('操作成功！');
        mutate();
      } else {
        const userMsg: string | undefined = userErrorCodeObj[res.data.code];
        userMsg ? toast(userMsg, { type: 'error' }) : toast(res.data.message, { type: 'error' });
        console.error(res.data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast(err.message, { type: 'error' });
        console.error(err);
      }
    } finally {
      setloadingUpload(false);
    }
  };

  const getShortName = (name: string): string => {
    const max = 50;
    if (!name || name.length <= max) {
      return name;
    }
    const fore = name.slice(0, Math.floor((max * 3) / 5));
    const aft = name.slice(name.length - Math.floor((max * 2) / 5), name.length);

    return `${fore}……${aft}`;
  };

  return (
    <Layout
      type='alpha'
      leftChildren={
        <div className={style.uploadImg}>
          <div className={style.title}>目前得票最高的封面图片</div>
          <Divider className={style.divider} />
          {current?.thumbnail && (
            <div className={style.uploadImgCoverSelected}>
              <Image src={current.thumbnail} />
            </div>
          )}
          <div className={style.title}>已上传的封面图片</div>
          <Divider className={style.divider} />
          <div className={style.uploadImgCoverUploaded}>
            {covers.map((cover) => {
              return (
                <WikiCoverItem
                  key={cover.id}
                  id={cover.id}
                  voted={cover.voted}
                  creator={cover.creator}
                  thumbnail={cover.thumbnail}
                  onCommentUpdate={mutate}
                />
              );
            })}
          </div>
          <div className={style.title}>从你的电脑上选择新的图片</div>
          <Divider className={style.divider} />
          <Message type='error'>
            请确保你的图片符合相关规定，任何包含 R18 或敏感内容的图片都会被直接移除
          </Message>
          <div className={style.uploadImgBottom}>
            <label htmlFor='coverUploader'>选择本地文件</label>
            <input
              type='file'
              ref={uploaderRef}
              name='coverUploader'
              accept='.webp,.jpg,.jpeg,.png'
            />
            <span>{uploadName}</span>
          </div>
          {uploadContent && (
            <Button
              className={style.uploadImgBtn}
              color='blue'
              onClick={uploadCover}
              type='primary'
              disabled={loadingUpload}
            >
              {loadingUpload ? '···' : '上传图片'}
            </Button>
          )}
        </div>
      }
    />
  );
};

export default withErrorBoundary(WikiUploadImgPage);
