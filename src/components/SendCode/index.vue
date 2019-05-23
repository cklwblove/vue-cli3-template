<template>
  <button :disabled="isStart" v-text="text"></button>
</template>

<script>
export default {
  name: 'SendCode',
  data() {
    return {
      timer: null,
      isStart: false,
      text: '获取短信验证码',
    };
  },
  props: {
    initText: {
      type: String,
      default: '获取验证码',
    },
    second: {
      default: 60,
      validator(val) {
        return /^\d*$/.test(val);
      },
    },
    runText: {
      type: String,
      default: '{%s}秒后重新获取',
    },
    resetText: {
      type: String,
      default: '重新获取验证码',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    run() {
      let second = this.second;
      this.text = this.getText(this.second);
      this.timer = setInterval(() => {
        second--;
        this.text = this.getText(second);
        second <= 0 && this.stop();
      }, 1000);
    },
    stop: function() {
      this.text = this.resetText;
      this.$emit('input', false);
      clearInterval(this.timer);
    },
    getText(second) {
      return this.runText.replace(/\{([^{]*?)%s(.*?)\}/g, second);
    },
  },
  watch: {
    value: function(val) {
      this.isStart = val;
      val && this.run();
    },
  },
  mounted() {
    if (this.initText) {
      this.text = this.initText;
    }
  },
  destroyed() {
    this.stop();
  },
};
</script>

<!--
用法：

html:

<send-code class="btn btn-default" v-model="start" @click.native="sendCode"></send-code>

or

<send-code class="btn btn-default" v-model="start" @click.native="sendCode"></send-code>

<send-code class="btn btn-default" v-model="start" second="15" initText="点我啊，你点我啊"
            runText="在{%s}秒后你就可以重新获取啦"
            resetText="你可以重新获取验证码啦"
            @click.native="sendCode"></send-code>

js:
 export default {
        data() {
            return {
                start: false
            }
        },
        methods: {
            sendCode() {
                setTimeout(() => {
                    this.start = true;
                }, 1000);
            }
        }
    }
-->
