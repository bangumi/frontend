import React from 'react'
import { ComponentStory } from '@storybook/react'
import RichContent from '.'

export default {
  title: 'modern/RichContent',
  component: RichContent,
}

const demoText = `
<p>又名：CUP人生茶话会</p>
<br/>
<p>1.上班的时候想要回家的。 </p>
<p>2.学校课上打瞌睡的。<img src="https://lain.bgm.tv/img/smiles/tv/15.gif" smileid="54" alt="(bgm38)"></p>

<p><a href="https://www.youtube.com/watch?v=hw-ukQ1MuT0" target="_blank" rel="nofollow external noopener noreferrer" class="l">LUVORATORRRRRY! 歌ってみた</a></p>
`

export const Demo: ComponentStory<typeof RichContent> = () => {
  return <RichContent html={demoText} />
}
