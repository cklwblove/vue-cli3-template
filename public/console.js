// 移动端调试工具
if (window.LOCAL_CONFIG.IS_OPEN_VCONSOLE) {
  function dynamicLoadScript(src, callback, options) {
    const existingScript = document.getElementById(src);
    const cb = callback || function() {};

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = src; // src url for the third-party library being loaded.
      script.id = options.id || src;
      if (options.crossorigin) {
        script.crossorigin = options.crossorigin;
      }
      if (options.async) {
        script.async = options.async;
      }
      if (options.defer) {
        script.defer = options.defer;
      }

      document.body.appendChild(script);

      const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd;
      onEnd(script, cb);
    }

    if (existingScript && cb) cb(null, existingScript);

    function stdOnEnd(script, cb) {
      script.onload = function() {
        // this.onload = null here is necessary
        // because even IE9 works not like others
        this.onerror = this.onload = null;
        cb(null, script);
      };
      script.onerror = function() {
        this.onerror = this.onload = null;
        cb(new Error('Failed to load ' + src), script);
      };
    }

    function ieOnEnd(script, cb) {
      script.onreadystatechange = function() {
        if (this.readyState !== 'complete' && this.readyState !== 'loaded')
          return;
        this.onreadystatechange = null;
        cb(null, script); // there is no way to catch loading errors in IE8
      };
    }
  }

  dynamicLoadScript(
    './vconsole.min.js',
    function(err) {
      if (err) {
        console.error('加载 vconsole.min.js 出现异常');
        return;
      }
      try {
        var vconsole = new VConsole();
        vconsole.setOption({ maxLogNumber: 5000 });
        console.log('当前 url', window.location.href);
      } catch (err) {
        console.error('new VConsole() 出现异常');
      }
    },
    { async: true }
  );
}
