import type { ComponentMeta, Story } from '@storybook/react';
import React, { useState } from 'react';

import { render as renderBBCode } from '@bangumi/utils';

import type { CollapsibleContentProps } from '.';
import CollapsibleContent from '.';

const storyMeta: ComponentMeta<typeof CollapsibleContent> = {
  title: 'modern/CollapsibleContent',
  component: CollapsibleContent,
};

export default storyMeta;

const Template: Story<CollapsibleContentProps> = (args) => {
  const [collapsed, setCollapsed] = useState(true);
  return <CollapsibleContent {...args} collapsed={collapsed} onChange={setCollapsed} />;
};

export const Basic = Template.bind({});
const description = `欢迎加入番组WIKI计划小组！

本小组旨在提供和修正 Bangumi 内条目信息的内容，交流 Bangumi 的使用心得，使网站提供的信息更加准确和完善。

如果你对向网友无偿贡献感兴趣并有足够的时间，本小组将对您的修订工作做出指导与规范，同时也欢迎您加入到指导与规范的工作中来。

点击以下链接，查看最近修改的条目，以及有哪些条目有待完善：
[url]http://bangumi.tv/wiki[/url]

参与编辑前需要了解的基本知识：
◆ [url=http://bgm.tv/group/topic/312100]收录范围[/url]
◆ [url=http://bgm.tv/group/topic/24657]成为维基人[/url]
◆ [url=http://bgm.tv/group/topic/15693]相关规则汇总[/url]
◆ [url=http://bgm.tv/group/topic/10657]添加互助[/url]

需要维基管理员参与的：
◆ [url=http://bgm.tv/group/topic/8465]重复条目汇报[/url]
◆ [url=http://bgm.tv/group/topic/8467]错误章节汇报[/url]
◆ [url=http://bgm.tv/group/topic/8466]重复人物汇报[/url]
◆ [url=http://bgm.tv/group/topic/25312]疑似违规条目汇报[/url]

地图：
[url=http://bgm.tv]Bangumi[/url]
├ [url=http://bgm.tv/group/forum]站务论坛[/url]
├ [url=http://bgm.tv/group/wiki]番組WIKI計画[/url]  (就是这里)
└ [url=http://bgm.tv/group/issues]BUG追踪[/url]
`;
Basic.args = {
  threshold: 192,
  content: renderBBCode(description),
};
