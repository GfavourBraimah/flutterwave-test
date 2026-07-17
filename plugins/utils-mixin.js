import Vue from 'vue'

Vue.mixin({
  methods: {
    getReadTime(string) {
      var words, time, wpm;
      try {
        wpm = 225;
        words = string.trim().split(/\s+/).length;
        time = Math.ceil(words / wpm);
      } catch (err) {
        time = 0;
      } finally {
        return time;
      }
    }
  },
})
