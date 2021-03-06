require('less/toast.less');

function toast(msg, time) {
  this.msg = msg;
  this.dismissTime = time || 1000;
  this.createToast();
  this.showToast();
}

toast.prototype = {
  createToast: function() {
    var tpl = '<div class="toast">'+this.msg+'</div>';
    this.$toast = $(tpl);
    $('body').append(this.$toast);
  },
  showToast: function() {
    var _this = this;
    this.$toast.fadeIn(300, function() {
      setTimeout(function() {
        _this.$toast.fadeOut(400, function() {
          _this.$toast.remove();
        });
      }, _this.dismissTime);
    });
  }
};

function Toast(msg, time) {
  return new toast(msg, time);
}

window.Toast = Toast;
module.exports.Toast = Toast



