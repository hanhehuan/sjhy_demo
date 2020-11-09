/**
 * postcss的配置文件
 *  postcss 是基于node。js运行的处理css的工具
 * 所以他的配置文件也是运行在node里面的
 */
//  postcss 文件需要导出为一个对象
module.exports = {
  //  配置要使用的相关插件
  plugins: {
    //  自动添加浏览器前缀，用来兼容不同浏览器
    //  vuecli 默认已经在内部配置了autoprefixer
    //  autoprefixer: {
  //  browsers用来配置要兼容到的系统环境
  //  这个配置没有问题，但是会有控制台编译警告
  //  why?因为vuecli是通过
  //  .browserslistrc文件来配置要兼容的环境信息的
  //  browsers: ['Android >= 4.0', 'iOS >= 8']
    //  },
    //  把px转化为rem
    'postcss-pxtorem': {
      //  转换的根元素基准值
      //  正常情况下按你的设计稿来
      //  750宽的设计稿，750  / 10 = 75
      //  375宽的设计稿，375 / 10 = 37.5
      //  vant组件库是按照375宽写的
      //  iPhone 6/7/8
      rootValue: 37.5,
      //  需要转化的css属性，*就是所有都需要
      propList: ['*']
    }
  }
}
