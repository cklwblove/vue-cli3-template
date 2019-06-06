<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="~@assets/img/logo.png" />
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
      <svg-icon name="cat"></svg-icon>
      <send-code
        class="btn btn-default"
        v-model="start"
        @click.native="sendCode"
      ></send-code>
      <div class="demo">
        <h3>方法示例</h3>
        <pre>
          &lt;template&gt;
            &lt;div class=&quot;page page-hello&quot;&gt;
              &lt;!-- 静态资源路径写法事例 --&gt;
              &lt;img src=&quot;~@assets/images/copyfiles/logo.png&quot;&gt;
              &lt;p v-text=&quot;msg&quot;&gt;&lt;/p&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            /**
            * 以下仅为事例代码，可以随意扩展修改
            */

            // 工具类
            import {formatDate} from &#x27;utils&#x27;;

            export default {
              data() {
                return {
                  msg: &#x27;Welcome to Your Vue.js App&#x27;,
                  start: false
                }
              },
              created() {
                this.movieComingSoon();
              },
              methods: {
                getTenantInfo() {
                  // 接口请求示例
                  const data = {};
                  this.$services.comingSoon({data}).then((res) =&gt; {
                    console.log(&#x27;接口请求成功：&#x27; + JSON.stringify(res, null, 2));
                  }).catch((err) => {
                    console.log(&#x27;接口请求异常：&#x27; + err);
                  });
                }
              }
            }
          &lt;/script&gt;

          &lt;style lang=&quot;less&quot; rel=&quot;stylesheet/less&quot;&gt;
            @import &quot;./style.less&quot;;
          &lt;/style&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 以下仅为事例代码，可以随意扩展修改
 */
// 工具类
import { formatDate } from 'utils';
import { SendCode } from '@/components';

export default {
  components: {
    SendCode,
  },

  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      start: false,
      message: '现在时间是：' + formatDate(Date.now()),
    };
  },

  created() {
    this.movieComingSoon();
  },

  methods: {
    movieComingSoon() {
      const data = { test: '123' };
      this.$services
        .octocat({
          method: 'get',
          data,
        })
        .then((res) => {
          console.log('接口请求成功：' + JSON.stringify(res, null, 2));
        })
        .catch((err) => {
          console.log('接口请求异常：' + err);
        });
    },
    sendCode() {
      setTimeout(() => {
        this.start = true;
      }, 1000);
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less">
@import './style.less';

h3 {
  background-color: @colorBlueMain;
}
</style>
