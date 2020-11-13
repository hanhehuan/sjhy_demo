<template>
  <div class="home_container">
    <!--导航栏-->
    <van-nav-bar  class="app-nav-bar">
      <van-button slot="title" icon="search" type="info" round size="small" class="search-btn">搜索</van-button>
    </van-nav-bar>
    <!--/导航栏-->
    <!--文章频道列表-->
    <van-tabs v-model="active">
      <van-tab
        :title="channel.name"
        :key="channel.id"
        v-for="channel in channels"
      >
        <!-- 文章列表-->
        <article-list :channel="channel"/>
        <!--/文章列表-->
      </van-tab>
    </van-tabs>
    <!--/文章频道列表-->
  </div>
</template>

<script>
  import { getUserChannels } from '../../api/user'
  import ArticleList from './components/article-list'
  export default {
  name: 'HomeIndex',
    components:{
    ArticleList
    },
  data(){
    return{
      active:0,
      channels:[]
    }
  },
    created () {
      this.loadChannels();
    },
    methods:{
    async loadChannels(){
     const { data } = await getUserChannels();
     this.channels = data.data.channels;
    }
  }
}
</script>

<style scoped lang="less">
.home_container{
  /deep/.van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    background:#5babfb;
    border: none;
    .van-icon{
      font-size: 16px;

    }
    .van-button__text{
      font-size: 14px;

    }
  }
}
</style>
