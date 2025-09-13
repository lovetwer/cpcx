if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createLifeCycleHook = (lifecycle, flag2 = 0) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createLifeCycleHook(
    ON_LOAD,
    2
    /* HookFlags.PAGE */
  );
  const defineMixin = (options) => {
    return options;
  };
  const version = "3";
  {
    formatAppLog("log", "at uni_modules/uview-plus/libs/config/config.js:5", `
 %c uview-plus V${version} %c https://ijry.github.io/uview-plus/ 

`, "color: #ffffff; background: #3c9cff; padding:5px 0;", "color: #3c9cff;background: #ffffff; padding:5px 0;");
  }
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ],
    // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
    color: {
      "u-primary": "#2979ff",
      "u-warning": "#ff9900",
      "u-success": "#19be6b",
      "u-error": "#fa3534",
      "u-info": "#909399",
      "u-main-color": "#303133",
      "u-content-color": "#606266",
      "u-tips-color": "#909399",
      "u-light-color": "#c0c4cc",
      "up-primary": "#2979ff",
      "up-warning": "#ff9900",
      "up-success": "#19be6b",
      "up-error": "#fa3534",
      "up-info": "#909399",
      "up-main-color": "#303133",
      "up-content-color": "#606266",
      "up-tips-color": "#909399",
      "up-light-color": "#c0c4cc"
    },
    // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
    unit: "px"
  };
  const ActionSheet = {
    // action-sheet组件
    actionSheet: {
      show: false,
      title: "",
      description: "",
      actions: [],
      index: "",
      cancelText: "",
      closeOnClickAction: true,
      safeAreaInsetBottom: true,
      openType: "",
      closeOnClickOverlay: true,
      round: 0,
      wrapMaxHeight: "600px"
    }
  };
  const Album = {
    // album 组件
    album: {
      urls: [],
      keyName: "",
      singleSize: 180,
      multipleSize: 70,
      space: 6,
      singleMode: "scaleToFill",
      multipleMode: "aspectFill",
      maxCount: 9,
      previewFullImage: true,
      rowCount: 3,
      showMore: true,
      autoWrap: false,
      unit: "px",
      stop: true
    }
  };
  const Alert = {
    // alert警告组件
    alert: {
      title: "",
      type: "warning",
      description: "",
      closable: false,
      showIcon: false,
      effect: "light",
      center: false,
      fontSize: 14
    }
  };
  const Avatar = {
    // avatar 组件
    avatar: {
      src: "",
      shape: "circle",
      size: 40,
      mode: "scaleToFill",
      text: "",
      bgColor: "#c0c4cc",
      color: "#ffffff",
      fontSize: 18,
      icon: "",
      mpAvatar: false,
      randomBgColor: false,
      defaultUrl: "",
      colorIndex: "",
      name: ""
    }
  };
  const AvatarGroup = {
    // avatarGroup 组件
    avatarGroup: {
      urls: [],
      maxCount: 5,
      shape: "circle",
      mode: "scaleToFill",
      showMore: true,
      size: 40,
      keyName: "",
      gap: 0.5,
      extraValue: 0
    }
  };
  const Backtop = {
    // backtop组件
    backtop: {
      mode: "circle",
      icon: "arrow-upward",
      text: "",
      duration: 100,
      scrollTop: 0,
      top: 400,
      bottom: 100,
      right: 20,
      zIndex: 9,
      iconStyle: {
        color: "#909399",
        fontSize: "19px"
      }
    }
  };
  const Badge = {
    // 徽标数组件
    badge: {
      isDot: false,
      value: "",
      show: true,
      max: 999,
      type: "error",
      showZero: false,
      bgColor: null,
      color: null,
      shape: "circle",
      numberType: "overflow",
      offset: [],
      inverted: false,
      absolute: false
    }
  };
  const Button = {
    // button组件
    button: {
      hairline: false,
      type: "info",
      size: "normal",
      shape: "square",
      plain: false,
      disabled: false,
      loading: false,
      loadingText: "",
      loadingMode: "spinner",
      loadingSize: 15,
      openType: "",
      formType: "",
      appParameter: "",
      hoverStopPropagation: true,
      lang: "en",
      sessionFrom: "",
      sendMessageTitle: "",
      sendMessagePath: "",
      sendMessageImg: "",
      showMessageCard: false,
      dataName: "",
      throttleTime: 0,
      hoverStartTime: 0,
      hoverStayTime: 200,
      text: "",
      icon: "",
      iconColor: "",
      color: ""
    }
  };
  const Calendar$1 = {
    // calendar 组件
    calendar: {
      title: "日期选择",
      showTitle: true,
      showSubtitle: true,
      mode: "single",
      startText: "开始",
      endText: "结束",
      customList: [],
      color: "#3c9cff",
      minDate: 0,
      maxDate: 0,
      defaultDate: null,
      maxCount: Number.MAX_SAFE_INTEGER,
      // Infinity
      rowHeight: 56,
      formatter: null,
      showLunar: false,
      showMark: true,
      confirmText: "确定",
      confirmDisabledText: "确定",
      show: false,
      closeOnClickOverlay: false,
      readonly: false,
      showConfirm: true,
      maxRange: Number.MAX_SAFE_INTEGER,
      // Infinity
      rangePrompt: "",
      showRangePrompt: true,
      allowSameDay: false,
      round: 0,
      monthNum: 3
    }
  };
  const CarKeyboard = {
    // 车牌号键盘
    carKeyboard: {
      random: false
    }
  };
  const Cell = {
    // cell组件的props
    cell: {
      customClass: "",
      title: "",
      label: "",
      value: "",
      icon: "",
      disabled: false,
      border: true,
      center: false,
      url: "",
      linkType: "navigateTo",
      clickable: false,
      isLink: false,
      required: false,
      arrowDirection: "",
      iconStyle: {},
      rightIconStyle: {},
      rightIcon: "arrow-right",
      titleStyle: {},
      size: "",
      stop: true,
      name: ""
    }
  };
  const CellGroup = {
    // cell-group组件的props
    cellGroup: {
      title: "",
      border: true,
      customStyle: {}
    }
  };
  const Checkbox = {
    // checkbox组件
    checkbox: {
      name: "",
      shape: "",
      size: "",
      checkbox: false,
      disabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      iconColor: "",
      label: "",
      labelSize: "",
      labelColor: "",
      labelDisabled: ""
    }
  };
  const CheckboxGroup = {
    // checkbox-group组件
    checkboxGroup: {
      name: "",
      value: [],
      shape: "square",
      disabled: false,
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      size: 18,
      placement: "row",
      labelSize: 14,
      labelColor: "#303133",
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      iconPlacement: "left",
      borderBottom: false
    }
  };
  const CircleProgress = {
    // circleProgress 组件
    circleProgress: {
      percentage: 30
    }
  };
  const Code = {
    // code 组件
    code: {
      seconds: 60,
      startText: "获取验证码",
      changeText: "X秒重新获取",
      endText: "重新获取",
      keepRunning: false,
      uniqueKey: ""
    }
  };
  const CodeInput = {
    // codeInput 组件
    codeInput: {
      adjustPosition: true,
      maxlength: 6,
      dot: false,
      mode: "box",
      hairline: false,
      space: 10,
      value: "",
      focus: false,
      bold: false,
      color: "#606266",
      fontSize: 18,
      size: 35,
      disabledKeyboard: false,
      borderColor: "#c9cacc",
      disabledDot: true
    }
  };
  const Col = {
    // col 组件
    col: {
      span: 12,
      offset: 0,
      justify: "start",
      align: "stretch",
      textAlign: "left"
    }
  };
  const Collapse = {
    // collapse 组件
    collapse: {
      value: null,
      accordion: false,
      border: true
    }
  };
  const CollapseItem = {
    // collapseItem 组件
    collapseItem: {
      title: "",
      value: "",
      label: "",
      disabled: false,
      isLink: true,
      clickable: true,
      border: true,
      align: "left",
      name: "",
      icon: "",
      duration: 300,
      showRight: true
    }
  };
  const ColumnNotice = {
    // columnNotice 组件
    columnNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80,
      step: false,
      duration: 1500,
      disableTouch: true
    }
  };
  const CountDown = {
    // u-count-down 计时器组件
    countDown: {
      time: 0,
      format: "HH:mm:ss",
      autoStart: true,
      millisecond: false
    }
  };
  const CountTo = {
    // countTo 组件
    countTo: {
      startVal: 0,
      endVal: 0,
      duration: 2e3,
      autoplay: true,
      decimals: 0,
      useEasing: true,
      decimal: ".",
      color: "#606266",
      fontSize: 22,
      bold: false,
      separator: ""
    }
  };
  const DatetimePicker = {
    // datetimePicker 组件
    datetimePicker: {
      show: false,
      popupMode: "bottom",
      showToolbar: true,
      value: "",
      title: "",
      mode: "datetime",
      maxDate: new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 0, 1).getTime(),
      minDate: new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime(),
      minHour: 0,
      maxHour: 23,
      minMinute: 0,
      maxMinute: 59,
      filter: null,
      formatter: null,
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      closeOnClickOverlay: false,
      defaultIndex: []
    }
  };
  const Divider = {
    // divider组件
    divider: {
      dashed: false,
      hairline: true,
      dot: false,
      textPosition: "center",
      text: "",
      textSize: 14,
      textColor: "#909399",
      lineColor: "#dcdfe6"
    }
  };
  const Empty = {
    // empty组件
    empty: {
      icon: "",
      text: "",
      textColor: "#c0c4cc",
      textSize: 14,
      iconColor: "#c0c4cc",
      iconSize: 90,
      mode: "data",
      width: 160,
      height: 160,
      show: true,
      marginTop: 0
    }
  };
  const Form = {
    // form 组件
    form: {
      model: {},
      rules: {},
      errorType: "message",
      borderBottom: true,
      labelPosition: "left",
      labelWidth: 45,
      labelAlign: "left",
      labelStyle: {}
    }
  };
  const GormItem = {
    // formItem 组件
    formItem: {
      label: "",
      prop: "",
      rules: [],
      borderBottom: "",
      labelPosition: "",
      labelWidth: "",
      rightIcon: "",
      leftIcon: "",
      required: false,
      leftIconStyle: ""
    }
  };
  const Gap = {
    // gap组件
    gap: {
      bgColor: "transparent",
      height: 20,
      marginTop: 0,
      marginBottom: 0,
      customStyle: {}
    }
  };
  const Grid = {
    // grid组件
    grid: {
      col: 3,
      border: false,
      align: "left"
    }
  };
  const GridItem = {
    // grid-item组件
    gridItem: {
      name: null,
      bgColor: "transparent"
    }
  };
  const {
    color: color$3
  } = config;
  const Icon = {
    // icon组件
    icon: {
      name: "",
      color: color$3["u-content-color"],
      size: "16px",
      bold: false,
      index: "",
      hoverClass: "",
      customPrefix: "uicon",
      label: "",
      labelPos: "right",
      labelSize: "15px",
      labelColor: color$3["u-content-color"],
      space: "3px",
      imgMode: "",
      width: "",
      height: "",
      top: 0,
      stop: false
    }
  };
  const Image = {
    // image组件
    image: {
      src: "",
      mode: "aspectFill",
      width: "300",
      height: "225",
      shape: "square",
      radius: 0,
      lazyLoad: true,
      showMenuByLongpress: true,
      loadingIcon: "photo",
      errorIcon: "error-circle",
      showLoading: true,
      showError: true,
      fade: true,
      webp: false,
      duration: 500,
      bgColor: "#f3f4f6"
    }
  };
  const IndexAnchor = {
    // indexAnchor 组件
    indexAnchor: {
      text: "",
      color: "#606266",
      size: 14,
      bgColor: "#dedede",
      height: 32
    }
  };
  const IndexList = {
    // indexList 组件
    indexList: {
      inactiveColor: "#606266",
      activeColor: "#5677fc",
      indexList: [],
      sticky: true,
      customNavHeight: 0,
      safeBottomFix: false
    }
  };
  const Input = {
    // index 组件
    input: {
      value: "",
      type: "text",
      fixed: false,
      disabled: false,
      disabledColor: "#f5f7fa",
      clearable: false,
      password: false,
      maxlength: 140,
      placeholder: null,
      placeholderClass: "input-placeholder",
      placeholderStyle: "color: #c0c4cc",
      showWordLimit: false,
      confirmType: "done",
      confirmHold: false,
      holdKeyboard: false,
      focus: false,
      autoBlur: false,
      disableDefaultPadding: false,
      cursor: -1,
      cursorSpacing: 30,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      inputAlign: "left",
      fontSize: "15px",
      color: "#303133",
      prefixIcon: "",
      prefixIconStyle: "",
      suffixIcon: "",
      suffixIconStyle: "",
      border: "surround",
      readonly: false,
      shape: "square",
      formatter: null
    }
  };
  const Keyboard = {
    // 键盘组件
    keyboard: {
      mode: "number",
      dotDisabled: false,
      tooltip: true,
      showTips: true,
      tips: "",
      showCancel: true,
      showConfirm: true,
      random: false,
      safeAreaInsetBottom: true,
      closeOnClickOverlay: true,
      show: false,
      overlay: true,
      zIndex: 10075,
      cancelText: "取消",
      confirmText: "确定",
      autoChange: false
    }
  };
  const Line = {
    // line组件
    line: {
      color: "#d6d7d9",
      length: "100%",
      direction: "row",
      hairline: true,
      margin: 0,
      dashed: false
    }
  };
  const LineProgress = {
    // lineProgress 组件
    lineProgress: {
      activeColor: "#19be6b",
      inactiveColor: "#ececec",
      percentage: 0,
      showText: true,
      height: 12
    }
  };
  const {
    color: color$2
  } = config;
  const Link = {
    // link超链接组件props参数
    link: {
      color: color$2["u-primary"],
      fontSize: 15,
      underLine: false,
      href: "",
      mpTips: "链接已复制，请在浏览器打开",
      lineColor: "",
      text: ""
    }
  };
  const List = {
    // list 组件
    list: {
      showScrollbar: false,
      lowerThreshold: 50,
      upperThreshold: 0,
      scrollTop: 0,
      offsetAccuracy: 10,
      enableFlex: false,
      pagingEnabled: false,
      scrollable: true,
      scrollIntoView: "",
      scrollWithAnimation: false,
      enableBackToTop: false,
      height: 0,
      width: 0,
      preLoadScreen: 1
    }
  };
  const ListItem = {
    // listItem 组件
    listItem: {
      anchor: ""
    }
  };
  const {
    color: color$1
  } = config;
  const LoadingIcon = {
    // loading-icon加载中图标组件
    loadingIcon: {
      show: true,
      color: color$1["u-tips-color"],
      textColor: color$1["u-tips-color"],
      vertical: false,
      mode: "spinner",
      size: 24,
      textSize: 15,
      text: "",
      timingFunction: "ease-in-out",
      duration: 1200,
      inactiveColor: ""
    }
  };
  const LoadingPage = {
    // loading-page组件
    loadingPage: {
      loadingText: "正在加载",
      image: "",
      loadingMode: "circle",
      loading: false,
      bgColor: "#ffffff",
      color: "#C8C8C8",
      fontSize: 19,
      iconSize: 28,
      loadingColor: "#C8C8C8",
      zIndex: 10
    }
  };
  const Loadmore = {
    // loadmore 组件
    loadmore: {
      status: "loadmore",
      bgColor: "transparent",
      icon: true,
      fontSize: 14,
      iconSize: 17,
      color: "#606266",
      loadingIcon: "spinner",
      loadmoreText: "加载更多",
      loadingText: "正在加载...",
      nomoreText: "没有更多了",
      isDot: false,
      iconColor: "#b7b7b7",
      marginTop: 10,
      marginBottom: 10,
      height: "auto",
      line: false,
      lineColor: "#E6E8EB",
      dashed: false
    }
  };
  const Modal = {
    // modal 组件
    modal: {
      show: false,
      title: "",
      content: "",
      confirmText: "确认",
      cancelText: "取消",
      showConfirmButton: true,
      showCancelButton: false,
      confirmColor: "#2979ff",
      cancelColor: "#606266",
      buttonReverse: false,
      zoom: true,
      asyncClose: false,
      closeOnClickOverlay: false,
      negativeTop: 0,
      width: "650rpx",
      confirmButtonShape: "",
      contentTextAlign: "left"
    }
  };
  const color = {
    primary: "#3c9cff",
    info: "#909399",
    default: "#909399",
    warning: "#f9ae3d",
    error: "#f56c6c",
    success: "#5ac725",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  const Navbar = {
    // navbar 组件
    navbar: {
      safeAreaInsetTop: true,
      placeholder: false,
      fixed: true,
      border: false,
      leftIcon: "arrow-left",
      leftText: "",
      rightText: "",
      rightIcon: "",
      title: "",
      bgColor: "#ffffff",
      titleWidth: "400rpx",
      height: "44px",
      leftIconSize: 20,
      leftIconColor: color.mainColor,
      autoBack: false,
      titleStyle: ""
    }
  };
  const NoNetwork = {
    // noNetwork
    noNetwork: {
      tips: "哎呀，网络信号丢失",
      zIndex: "",
      image: "data:image/png;base64,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"
    }
  };
  const NoticeBar = {
    // noticeBar
    noticeBar: {
      text: [],
      direction: "row",
      step: false,
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      speed: 80,
      fontSize: 14,
      duration: 2e3,
      disableTouch: true,
      url: "",
      linkType: "navigateTo"
    }
  };
  const Notify = {
    // notify组件
    notify: {
      top: 0,
      type: "primary",
      color: "#ffffff",
      bgColor: "",
      message: "",
      duration: 3e3,
      fontSize: 15,
      safeAreaInsetTop: false
    }
  };
  const NumberBox = {
    // 步进器组件
    numberBox: {
      name: "",
      value: 0,
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      step: 1,
      integer: false,
      disabled: false,
      disabledInput: false,
      asyncChange: false,
      inputWidth: 35,
      showMinus: true,
      showPlus: true,
      decimalLength: null,
      longPress: true,
      color: "#323233",
      buttonSize: 30,
      bgColor: "#EBECEE",
      cursorSpacing: 100,
      disableMinus: false,
      disablePlus: false,
      iconStyle: ""
    }
  };
  const NumberKeyboard = {
    // 数字键盘
    numberKeyboard: {
      mode: "number",
      dotDisabled: false,
      random: false
    }
  };
  const Overlay = {
    // overlay组件
    overlay: {
      show: false,
      zIndex: 10070,
      duration: 300,
      opacity: 0.5
    }
  };
  const Parse = {
    // parse
    parse: {
      copyLink: true,
      errorImg: "",
      lazyLoad: false,
      loadingImg: "",
      pauseVideo: true,
      previewImg: true,
      setTitle: true,
      showImgMenu: true
    }
  };
  const Picker = {
    // picker
    picker: {
      show: false,
      popupMode: "bottom",
      showToolbar: true,
      title: "",
      columns: [],
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确定",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      keyName: "text",
      closeOnClickOverlay: false,
      defaultIndex: [],
      immediateChange: true
    }
  };
  const Popup = {
    // popup组件
    popup: {
      show: false,
      overlay: true,
      mode: "bottom",
      duration: 300,
      closeable: false,
      overlayStyle: {},
      closeOnClickOverlay: true,
      zIndex: 10075,
      safeAreaInsetBottom: true,
      safeAreaInsetTop: false,
      closeIconPos: "top-right",
      round: 0,
      zoom: true,
      bgColor: "",
      overlayOpacity: 0.5
    }
  };
  const Radio = {
    // radio组件
    radio: {
      name: "",
      shape: "",
      disabled: "",
      labelDisabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      labelSize: "",
      label: "",
      labelColor: "",
      size: "",
      iconColor: "",
      placement: ""
    }
  };
  const RadioGroup = {
    // radio-group组件
    radioGroup: {
      value: "",
      disabled: false,
      shape: "circle",
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      name: "",
      size: 18,
      placement: "row",
      label: "",
      labelColor: "#303133",
      labelSize: 14,
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      borderBottom: false,
      iconPlacement: "left",
      gap: "10px"
    }
  };
  const Rate = {
    // rate组件
    rate: {
      value: 1,
      count: 5,
      disabled: false,
      size: 18,
      inactiveColor: "#b2b2b2",
      activeColor: "#FA3534",
      gutter: 4,
      minCount: 1,
      allowHalf: false,
      activeIcon: "star-fill",
      inactiveIcon: "star",
      touchable: true
    }
  };
  const ReadMore = {
    // readMore
    readMore: {
      showHeight: 400,
      toggle: false,
      closeText: "展开阅读全文",
      openText: "收起",
      color: "#2979ff",
      fontSize: 14,
      textIndent: "2em",
      name: ""
    }
  };
  const Row = {
    // row
    row: {
      gutter: 0,
      justify: "start",
      align: "center"
    }
  };
  const RowNotice = {
    // rowNotice
    rowNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80
    }
  };
  const ScrollList = {
    // scrollList
    scrollList: {
      indicatorWidth: 50,
      indicatorBarWidth: 20,
      indicator: true,
      indicatorColor: "#f2f2f2",
      indicatorActiveColor: "#3c9cff",
      indicatorStyle: ""
    }
  };
  const Search = {
    // search
    search: {
      shape: "round",
      bgColor: "#f2f2f2",
      placeholder: "请输入关键字",
      clearabled: true,
      focus: false,
      showAction: true,
      actionStyle: {},
      actionText: "搜索",
      inputAlign: "left",
      inputStyle: {},
      disabled: false,
      borderColor: "transparent",
      searchIconColor: "#909399",
      searchIconSize: 22,
      color: "#606266",
      placeholderColor: "#909399",
      searchIcon: "search",
      margin: "0",
      animation: false,
      value: "",
      maxlength: "-1",
      height: 32,
      label: null
    }
  };
  const Section = {
    // u-section组件
    section: {
      title: "",
      subTitle: "更多",
      right: true,
      fontSize: 15,
      bold: true,
      color: "#303133",
      subColor: "#909399",
      showLine: true,
      lineColor: "",
      arrow: true
    }
  };
  const Skeleton = {
    // skeleton
    skeleton: {
      loading: true,
      animate: true,
      rows: 0,
      rowsWidth: "100%",
      rowsHeight: 18,
      title: true,
      titleWidth: "50%",
      titleHeight: 18,
      avatar: false,
      avatarSize: 32,
      avatarShape: "circle"
    }
  };
  const Slider = {
    // slider组件
    slider: {
      value: 0,
      blockSize: 18,
      min: 0,
      max: 100,
      step: 1,
      activeColor: "#2979ff",
      inactiveColor: "#c0c4cc",
      blockColor: "#ffffff",
      showValue: false,
      disabled: false,
      blockStyle: {},
      useNative: false,
      height: "2px"
    }
  };
  const StatusBar = {
    // statusBar
    statusBar: {
      bgColor: "transparent"
    }
  };
  const Steps = {
    // steps组件
    steps: {
      direction: "row",
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#969799",
      activeIcon: "",
      inactiveIcon: "",
      dot: false
    }
  };
  const StepsItem = {
    // steps-item组件
    stepsItem: {
      title: "",
      desc: "",
      iconSize: 17,
      error: false
    }
  };
  const Sticky = {
    // sticky组件
    sticky: {
      offsetTop: 0,
      customNavHeight: 0,
      disabled: false,
      bgColor: "transparent",
      zIndex: "",
      index: ""
    }
  };
  const Subsection = {
    // subsection组件
    subsection: {
      list: [],
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#303133",
      mode: "button",
      fontSize: 12,
      bold: true,
      bgColor: "#eeeeef",
      keyName: "name"
    }
  };
  const SwipeAction = {
    // swipe-action组件
    swipeAction: {
      autoClose: true
    }
  };
  const SwipeActionItem = {
    // swipeActionItem 组件
    swipeActionItem: {
      show: false,
      closeOnClick: true,
      name: "",
      disabled: false,
      threshold: 20,
      autoClose: true,
      options: [],
      duration: 300
    }
  };
  const Swiper = {
    // swiper 组件
    swiper: {
      list: [],
      indicator: false,
      indicatorActiveColor: "#FFFFFF",
      indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
      indicatorStyle: "",
      indicatorMode: "line",
      autoplay: true,
      current: 0,
      currentItemId: "",
      interval: 3e3,
      duration: 300,
      circular: false,
      previousMargin: 0,
      nextMargin: 0,
      acceleration: false,
      displayMultipleItems: 1,
      easingFunction: "default",
      keyName: "url",
      imgMode: "aspectFill",
      height: 130,
      bgColor: "#f3f4f6",
      radius: 4,
      loading: false,
      showTitle: false
    }
  };
  const SwipterIndicator = {
    // swiperIndicator 组件
    swiperIndicator: {
      length: 0,
      current: 0,
      indicatorActiveColor: "",
      indicatorInactiveColor: "",
      indicatorMode: "line"
    }
  };
  const Switch = {
    // switch
    switch: {
      loading: false,
      disabled: false,
      size: 25,
      activeColor: "#2979ff",
      inactiveColor: "#ffffff",
      value: false,
      activeValue: true,
      inactiveValue: false,
      asyncChange: false,
      space: 0
    }
  };
  const Tabbar = {
    // tabbar
    tabbar: {
      value: null,
      safeAreaInsetBottom: true,
      border: true,
      zIndex: 1,
      activeColor: "#1989fa",
      inactiveColor: "#7d7e80",
      fixed: true,
      placeholder: true
    }
  };
  const TabbarItem = {
    //
    tabbarItem: {
      name: null,
      icon: "",
      badge: null,
      dot: false,
      text: "",
      badgeStyle: "top: 6px;right:2px;"
    }
  };
  const Tabs = {
    //
    tabs: {
      duration: 300,
      list: [],
      lineColor: "#3c9cff",
      activeStyle: {
        color: "#303133"
      },
      inactiveStyle: {
        color: "#606266"
      },
      lineWidth: 20,
      lineHeight: 3,
      lineBgSize: "cover",
      itemStyle: {
        height: "44px"
      },
      scrollable: true,
      current: 0,
      keyName: "name"
    }
  };
  const Tag = {
    // tag 组件
    tag: {
      type: "primary",
      disabled: false,
      size: "medium",
      shape: "square",
      text: "",
      bgColor: "",
      color: "",
      borderColor: "",
      closeColor: "#C6C7CB",
      name: "",
      plainFill: false,
      plain: false,
      closable: false,
      show: true,
      icon: "",
      iconColor: ""
    }
  };
  const Text = {
    // text 组件
    text: {
      type: "",
      show: true,
      text: "",
      prefixIcon: "",
      suffixIcon: "",
      mode: "",
      href: "",
      format: "",
      call: false,
      openType: "",
      bold: false,
      block: false,
      lines: "",
      color: "#303133",
      size: 15,
      iconStyle: {
        fontSize: "15px"
      },
      decoration: "none",
      margin: 0,
      lineHeight: "",
      align: "left",
      wordWrap: "normal"
    }
  };
  const Textarea = {
    // textarea 组件
    textarea: {
      value: "",
      placeholder: "",
      placeholderClass: "textarea-placeholder",
      placeholderStyle: "color: #c0c4cc",
      height: 70,
      confirmType: "done",
      disabled: false,
      count: false,
      focus: false,
      autoHeight: false,
      fixed: false,
      cursorSpacing: 0,
      cursor: "",
      showConfirmBar: true,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      disableDefaultPadding: false,
      holdKeyboard: false,
      maxlength: 140,
      border: "surround",
      formatter: null
    }
  };
  const Toast = {
    // toast组件
    toast: {
      zIndex: 10090,
      loading: false,
      text: "",
      icon: "",
      type: "",
      loadingMode: "",
      show: "",
      overlay: false,
      position: "center",
      params: {},
      duration: 2e3,
      isTab: false,
      url: "",
      callback: null,
      back: false
    }
  };
  const Toolbar = {
    // toolbar 组件
    toolbar: {
      show: true,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      title: ""
    }
  };
  const Tooltip = {
    // tooltip 组件
    tooltip: {
      text: "",
      copyText: "",
      size: 14,
      color: "#606266",
      bgColor: "transparent",
      direction: "top",
      zIndex: 10071,
      showCopy: true,
      buttons: [],
      overlay: true,
      showToast: true
    }
  };
  const Transition = {
    // transition动画组件的props
    transition: {
      show: false,
      mode: "fade",
      duration: "300",
      timingFunction: "ease-out"
    }
  };
  const Upload = {
    // upload组件
    upload: {
      accept: "image",
      extension: [],
      capture: ["album", "camera"],
      compressed: true,
      camera: "back",
      maxDuration: 60,
      uploadIcon: "camera-fill",
      uploadIconColor: "#D3D4D6",
      useBeforeRead: false,
      previewFullImage: true,
      maxCount: 52,
      disabled: false,
      imageMode: "aspectFill",
      name: "",
      sizeType: ["original", "compressed"],
      multiple: false,
      deletable: true,
      maxSize: Number.MAX_VALUE,
      fileList: [],
      uploadText: "",
      width: 80,
      height: 80,
      previewImage: true
    }
  };
  const defProps = {
    ...ActionSheet,
    ...Album,
    ...Alert,
    ...Avatar,
    ...AvatarGroup,
    ...Backtop,
    ...Badge,
    ...Button,
    ...Calendar$1,
    ...CarKeyboard,
    ...Cell,
    ...CellGroup,
    ...Checkbox,
    ...CheckboxGroup,
    ...CircleProgress,
    ...Code,
    ...CodeInput,
    ...Col,
    ...Collapse,
    ...CollapseItem,
    ...ColumnNotice,
    ...CountDown,
    ...CountTo,
    ...DatetimePicker,
    ...Divider,
    ...Empty,
    ...Form,
    ...GormItem,
    ...Gap,
    ...Grid,
    ...GridItem,
    ...Icon,
    ...Image,
    ...IndexAnchor,
    ...IndexList,
    ...Input,
    ...Keyboard,
    ...Line,
    ...LineProgress,
    ...Link,
    ...List,
    ...ListItem,
    ...LoadingIcon,
    ...LoadingPage,
    ...Loadmore,
    ...Modal,
    ...Navbar,
    ...NoNetwork,
    ...NoticeBar,
    ...Notify,
    ...NumberBox,
    ...NumberKeyboard,
    ...Overlay,
    ...Parse,
    ...Picker,
    ...Popup,
    ...Radio,
    ...RadioGroup,
    ...Rate,
    ...ReadMore,
    ...Row,
    ...RowNotice,
    ...ScrollList,
    ...Search,
    ...Section,
    ...Skeleton,
    ...Slider,
    ...StatusBar,
    ...Steps,
    ...StepsItem,
    ...Sticky,
    ...Subsection,
    ...SwipeAction,
    ...SwipeActionItem,
    ...Swiper,
    ...SwipterIndicator,
    ...Switch,
    ...Tabbar,
    ...TabbarItem,
    ...Tabs,
    ...Tag,
    ...Text,
    ...Textarea,
    ...Toast,
    ...Toolbar,
    ...Tooltip,
    ...Transition,
    ...Upload
  };
  const props$c = defineMixin({
    props: {
      // tab的数据
      list: {
        type: Array,
        default: () => defProps.subsection.list
      },
      // 当前活动的tab的index
      current: {
        type: [String, Number],
        default: () => defProps.subsection.current
      },
      // 激活的颜色
      activeColor: {
        type: String,
        default: () => defProps.subsection.activeColor
      },
      // 未激活的颜色
      inactiveColor: {
        type: String,
        default: () => defProps.subsection.inactiveColor
      },
      // 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
      mode: {
        type: String,
        default: () => defProps.subsection.mode
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: () => defProps.subsection.fontSize
      },
      // 激活tab的字体是否加粗
      bold: {
        type: Boolean,
        default: () => defProps.subsection.bold
      },
      // mode = button时，组件背景颜色
      bgColor: {
        type: String,
        default: () => defProps.subsection.bgColor
      },
      // 从list元素对象中读取的键名
      keyName: {
        type: String,
        default: () => defProps.subsection.keyName
      }
    }
  });
  const mpMixin = defineMixin({});
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (typeof value === "number") {
      if (value.toString().length !== 10 && value.toString().length !== 13) {
        return false;
      }
      return !isNaN(new Date(value).getTime());
    }
    if (typeof value === "string") {
      const numV = Number(value);
      if (!isNaN(numV)) {
        if (numV.toString().length === 10 || numV.toString().length === 13) {
          return !isNaN(new Date(numV).getTime());
        }
      }
      if (value.length < 10 || value.length > 19) {
        return false;
      }
      const dateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}( \d{1,2}:\d{2}(:\d{2})?)?$/;
      if (!dateRegex.test(value)) {
        return false;
      }
      const dateValue = new Date(value);
      return !isNaN(dateValue.getTime());
    }
    return false;
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
  }
  function string(value) {
    return typeof value === "string";
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    }
    if (value.length === 8) {
      return xreg.test(value);
    }
    return false;
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range$1(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (value === 0 || isNaN(value))
          return true;
        break;
      case "object":
        if (value === null || value.length === 0)
          return true;
        for (const i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value === "string") {
      try {
        const obj = JSON.parse(value);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range: range$1,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uview-plus/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
  }
  function getPx(value, unit = false) {
    if (number(value)) {
      return unit ? `${value}px` : Number(value);
    }
    if (/(rpx|upx)$/.test(value)) {
      return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
  }
  function sleep(value = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      name = name.replace(/up-([a-zA-Z0-9-_]+)/g, "u-$1");
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    if (typeof customStyle === "object") {
      customStyle.forEach((val, i) => {
        const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
        string2 += `${key}:${val};`;
      });
    }
    return trim(string2);
  }
  function addUnit(value = "auto", unit = "") {
    if (!unit) {
      unit = config.unit || "px";
    }
    if (unit == "rpx" && number(String(value))) {
      value = value * 2;
    }
    value = String(value);
    return number(value) ? `${value}${unit}` : value;
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    const o = array(obj) ? [] : {};
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge$1(targetOrigin = {}, source = {}) {
    let target = deepClone(targetOrigin);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (source[prop] == null) {
          target[prop] = source[prop];
        } else if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else if (target[prop].concat && source[prop].concat) {
          target[prop] = target[prop].concat(source[prop]);
        } else {
          target[prop] = deepMerge$1(target[prop], source[prop]);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function shallowMerge(target, source = {}) {
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (source[prop] == null) {
          target[prop] = source[prop];
        } else if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else if (target[prop].concat && source[prop].concat) {
          target[prop] = target[prop].concat(source[prop]);
        } else {
          target[prop] = shallowMerge(target[prop], source[prop]);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uview-plus/libs/function/index.js:279", `uView提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else {
      date2 = new Date(
        typeof dateTime === "string" ? dateTime.replace(/-/g, "/") : dateTime
      );
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(`${key}[${i}]=${value[i]}`);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value, unit = true) {
    const valueNum = parseInt(value);
    if (unit) {
      if (/s$/.test(value))
        return value;
      return value > 30 ? `${value}ms` : `${value}s`;
    }
    if (/ms$/.test(value))
      return valueNum;
    if (/s$/.test(value))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value) {
    return `00${value}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "u-form-item");
    const form = $parent.call(instance, "u-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (typeof obj !== "object" || null == obj) {
      return "";
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value) {
    if (typeof obj !== "object" || null == obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value);
    } else {
      obj[key] = value;
    }
  }
  function page() {
    const pages2 = getCurrentPages();
    return `/${pages2[pages2.length - 1].route || ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  const index = {
    range,
    getPx,
    sleep,
    os,
    sys,
    random,
    guid,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge: deepMerge$1,
    shallowMerge,
    error,
    randomArray,
    timeFormat,
    timeFrom,
    trim,
    queryParams,
    toast,
    type2icon,
    priceFormat,
    getDuration,
    padZero,
    formValidate,
    getProperty,
    setProperty,
    page,
    pages
    // setConfig
  };
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig2 = {};
      if (typeof options === "string") {
        mergeConfig2.url = this.mixinParam(options, params);
        mergeConfig2.type = "navigateTo";
      } else {
        mergeConfig2 = deepMerge$1(this.config, options);
        mergeConfig2.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig2.url === page())
        return;
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig2.params = params;
      mergeConfig2 = deepMerge$1(this.config, mergeConfig2);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig2, resolve);
        });
        isNext && this.openPage(mergeConfig2);
      } else {
        this.openPage(mergeConfig2);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  const mixin = defineMixin({
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    created() {
      this.$u.getRect = this.$uGetRect;
    },
    computed: {
      // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
      // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
      // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
      $u() {
        return deepMerge$1(uni.$u, {
          props: void 0,
          http: void 0,
          mixin: void 0
        });
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `u-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          route({ type: this.linkType, url: url2 });
        }
      },
      navTo(url2 = "", linkType = "navigateTo") {
        route({ type: this.linkType, url: url2 });
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = $parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  });
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$l = {
    name: "u-subsection",
    mixins: [mpMixin, mixin, props$c],
    data() {
      return {
        // 组件尺寸
        itemRect: {
          width: 0,
          height: 0
        },
        innerCurrent: "",
        windowResizeCallback: {}
      };
    },
    watch: {
      list(newValue, oldValue) {
        this.init();
      },
      current: {
        immediate: true,
        handler(n) {
          if (n !== this.innerCurrent) {
            this.innerCurrent = n;
          }
        }
      }
    },
    computed: {
      wrapperStyle() {
        const style = {};
        if (this.mode === "button") {
          style.backgroundColor = this.bgColor;
        }
        return style;
      },
      // 滑块的样式
      barStyle() {
        const style = {};
        style.width = `${this.itemRect.width}px`;
        style.height = `${this.itemRect.height}px`;
        style.transform = `translateX(${this.innerCurrent * this.itemRect.width}px)`;
        if (this.mode === "subsection") {
          style.backgroundColor = this.activeColor;
        }
        return style;
      },
      // 分段器item的样式
      itemStyle(index2) {
        return (index3) => {
          const style = {};
          if (this.mode === "subsection") {
            style.borderColor = this.activeColor;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
          return style;
        };
      },
      // 分段器文字颜色
      textStyle(index2) {
        return (index3) => {
          const style = {};
          style.fontWeight = this.bold && this.innerCurrent === index3 ? "bold" : "normal";
          style.fontSize = addUnit(this.fontSize);
          if (this.mode === "subsection") {
            style.color = this.innerCurrent === index3 ? "#fff" : this.inactiveColor;
          } else {
            style.color = this.innerCurrent === index3 ? this.activeColor : this.inactiveColor;
          }
          return style;
        };
      }
    },
    mounted() {
      this.init();
      this.windowResizeCallback = (res) => {
        this.init();
      };
      uni.onWindowResize(this.windowResizeCallback);
    },
    beforeUnmount() {
      uni.offWindowResize(this.windowResizeCallback);
    },
    emits: ["change"],
    methods: {
      addStyle,
      init() {
        this.innerCurrent = this.current;
        sleep().then(() => this.getRect());
      },
      // 判断展示文本
      getText(item) {
        return typeof item === "object" ? item[this.keyName] : item;
      },
      // 获取组件的尺寸
      getRect() {
        this.$uGetRect(".u-subsection__item--0").then((size) => {
          this.itemRect = size;
        });
      },
      clickHandler(index2) {
        this.innerCurrent = index2;
        this.$emit("change", index2);
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-subsection", [`u-subsection--${_ctx.mode}`]]),
        ref: "u-subsection",
        style: vue.normalizeStyle([$options.addStyle(_ctx.customStyle), $options.wrapperStyle])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-subsection__bar cursor-pointer", [
              _ctx.mode === "button" && "u-subsection--button__bar",
              $data.innerCurrent === 0 && _ctx.mode === "subsection" && "u-subsection__bar--first",
              $data.innerCurrent > 0 && $data.innerCurrent < _ctx.list.length - 1 && _ctx.mode === "subsection" && "u-subsection__bar--center",
              $data.innerCurrent === _ctx.list.length - 1 && _ctx.mode === "subsection" && "u-subsection__bar--last"
            ]]),
            ref: "u-subsection__bar",
            style: vue.normalizeStyle([$options.barStyle])
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.list, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["u-subsection__item cursor-pointer", [
                `u-subsection__item--${index2}`,
                index2 < _ctx.list.length - 1 && "u-subsection__item--no-border-right",
                index2 === 0 && "u-subsection__item--first",
                index2 === _ctx.list.length - 1 && "u-subsection__item--last"
              ]]),
              ref_for: true,
              ref: `u-subsection__item--${index2}`,
              style: vue.normalizeStyle([$options.itemStyle(index2)]),
              onClick: ($event) => $options.clickHandler(index2),
              key: index2
            }, [
              vue.createElementVNode(
                "text",
                {
                  class: "u-subsection__item__text",
                  style: vue.normalizeStyle([$options.textStyle(index2)])
                },
                vue.toDisplayString($options.getText(item)),
                5
                /* TEXT, STYLE */
              )
            ], 14, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-b5ccb67e"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-subsection/u-subsection.vue"]]);
  const props$b = defineMixin({
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: () => defProps.loadingIcon.show
      },
      // 颜色
      color: {
        type: String,
        default: () => defProps.loadingIcon.color
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: () => defProps.loadingIcon.textColor
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: () => defProps.loadingIcon.vertical
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: () => defProps.loadingIcon.mode
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: () => defProps.loadingIcon.size
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: () => defProps.loadingIcon.textSize
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: () => defProps.loadingIcon.text
      },
      // 动画模式
      timingFunction: {
        type: String,
        default: () => defProps.loadingIcon.timingFunction
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: () => defProps.loadingIcon.duration
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: () => defProps.loadingIcon.inactiveColor
      }
    }
  });
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex(startColor);
      if (i === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha) {
    color2 = rgbToHex(color2);
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = String(color2).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      return `rgba(${sColorChange.join(",")},${alpha})`;
    }
    return sColor;
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  const _sfc_main$k = {
    name: "u-loading-icon",
    mixins: [mpMixin, mixin, props$b],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      addUnit,
      addStyle,
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-loading-icon", [_ctx.vertical && "u-loading-icon--vertical"]]),
        style: vue.normalizeStyle([$options.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["u-loading-icon__spinner", [`u-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: $options.addUnit(_ctx.size),
              height: $options.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "u-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "u-loading-icon__text",
            style: vue.normalizeStyle({
              fontSize: $options.addUnit(_ctx.textSize),
              color: _ctx.textColor
            })
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-2af81691"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.vue"]]);
  const icons = {
    "uicon-level": "",
    "uicon-column-line": "",
    "uicon-checkbox-mark": "",
    "uicon-folder": "",
    "uicon-movie": "",
    "uicon-star-fill": "",
    "uicon-star": "",
    "uicon-phone-fill": "",
    "uicon-phone": "",
    "uicon-apple-fill": "",
    "uicon-chrome-circle-fill": "",
    "uicon-backspace": "",
    "uicon-attach": "",
    "uicon-cut": "",
    "uicon-empty-car": "",
    "uicon-empty-coupon": "",
    "uicon-empty-address": "",
    "uicon-empty-favor": "",
    "uicon-empty-permission": "",
    "uicon-empty-news": "",
    "uicon-empty-search": "",
    "uicon-github-circle-fill": "",
    "uicon-rmb": "",
    "uicon-person-delete-fill": "",
    "uicon-reload": "",
    "uicon-order": "",
    "uicon-server-man": "",
    "uicon-search": "",
    "uicon-fingerprint": "",
    "uicon-more-dot-fill": "",
    "uicon-scan": "",
    "uicon-share-square": "",
    "uicon-map": "",
    "uicon-map-fill": "",
    "uicon-tags": "",
    "uicon-tags-fill": "",
    "uicon-bookmark-fill": "",
    "uicon-bookmark": "",
    "uicon-eye": "",
    "uicon-eye-fill": "",
    "uicon-mic": "",
    "uicon-mic-off": "",
    "uicon-calendar": "",
    "uicon-calendar-fill": "",
    "uicon-trash": "",
    "uicon-trash-fill": "",
    "uicon-play-left": "",
    "uicon-play-right": "",
    "uicon-minus": "",
    "uicon-plus": "",
    "uicon-info": "",
    "uicon-info-circle": "",
    "uicon-info-circle-fill": "",
    "uicon-question": "",
    "uicon-error": "",
    "uicon-close": "",
    "uicon-checkmark": "",
    "uicon-android-circle-fill": "",
    "uicon-android-fill": "",
    "uicon-ie": "",
    "uicon-IE-circle-fill": "",
    "uicon-google": "",
    "uicon-google-circle-fill": "",
    "uicon-setting-fill": "",
    "uicon-setting": "",
    "uicon-minus-square-fill": "",
    "uicon-plus-square-fill": "",
    "uicon-heart": "",
    "uicon-heart-fill": "",
    "uicon-camera": "",
    "uicon-camera-fill": "",
    "uicon-more-circle": "",
    "uicon-more-circle-fill": "",
    "uicon-chat": "",
    "uicon-chat-fill": "",
    "uicon-bag-fill": "",
    "uicon-bag": "",
    "uicon-error-circle-fill": "",
    "uicon-error-circle": "",
    "uicon-close-circle": "",
    "uicon-close-circle-fill": "",
    "uicon-checkmark-circle": "",
    "uicon-checkmark-circle-fill": "",
    "uicon-question-circle-fill": "",
    "uicon-question-circle": "",
    "uicon-share": "",
    "uicon-share-fill": "",
    "uicon-shopping-cart": "",
    "uicon-shopping-cart-fill": "",
    "uicon-bell": "",
    "uicon-bell-fill": "",
    "uicon-list": "",
    "uicon-list-dot": "",
    "uicon-zhihu": "",
    "uicon-zhihu-circle-fill": "",
    "uicon-zhifubao": "",
    "uicon-zhifubao-circle-fill": "",
    "uicon-weixin-circle-fill": "",
    "uicon-weixin-fill": "",
    "uicon-twitter-circle-fill": "",
    "uicon-twitter": "",
    "uicon-taobao-circle-fill": "",
    "uicon-taobao": "",
    "uicon-weibo-circle-fill": "",
    "uicon-weibo": "",
    "uicon-qq-fill": "",
    "uicon-qq-circle-fill": "",
    "uicon-moments-circel-fill": "",
    "uicon-moments": "",
    "uicon-qzone": "",
    "uicon-qzone-circle-fill": "",
    "uicon-baidu-circle-fill": "",
    "uicon-baidu": "",
    "uicon-facebook-circle-fill": "",
    "uicon-facebook": "",
    "uicon-car": "",
    "uicon-car-fill": "",
    "uicon-warning-fill": "",
    "uicon-warning": "",
    "uicon-clock-fill": "",
    "uicon-clock": "",
    "uicon-edit-pen": "",
    "uicon-edit-pen-fill": "",
    "uicon-email": "",
    "uicon-email-fill": "",
    "uicon-minus-circle": "",
    "uicon-minus-circle-fill": "",
    "uicon-plus-circle": "",
    "uicon-plus-circle-fill": "",
    "uicon-file-text": "",
    "uicon-file-text-fill": "",
    "uicon-pushpin": "",
    "uicon-pushpin-fill": "",
    "uicon-grid": "",
    "uicon-grid-fill": "",
    "uicon-play-circle": "",
    "uicon-play-circle-fill": "",
    "uicon-pause-circle-fill": "",
    "uicon-pause": "",
    "uicon-pause-circle": "",
    "uicon-eye-off": "",
    "uicon-eye-off-outline": "",
    "uicon-gift-fill": "",
    "uicon-gift": "",
    "uicon-rmb-circle-fill": "",
    "uicon-rmb-circle": "",
    "uicon-kefu-ermai": "",
    "uicon-server-fill": "",
    "uicon-coupon-fill": "",
    "uicon-coupon": "",
    "uicon-integral": "",
    "uicon-integral-fill": "",
    "uicon-home-fill": "",
    "uicon-home": "",
    "uicon-hourglass-half-fill": "",
    "uicon-hourglass": "",
    "uicon-account": "",
    "uicon-plus-people-fill": "",
    "uicon-minus-people-fill": "",
    "uicon-account-fill": "",
    "uicon-thumb-down-fill": "",
    "uicon-thumb-down": "",
    "uicon-thumb-up": "",
    "uicon-thumb-up-fill": "",
    "uicon-lock-fill": "",
    "uicon-lock-open": "",
    "uicon-lock-opened-fill": "",
    "uicon-lock": "",
    "uicon-red-packet-fill": "",
    "uicon-photo-fill": "",
    "uicon-photo": "",
    "uicon-volume-off-fill": "",
    "uicon-volume-off": "",
    "uicon-volume-fill": "",
    "uicon-volume": "",
    "uicon-red-packet": "",
    "uicon-download": "",
    "uicon-arrow-up-fill": "",
    "uicon-arrow-down-fill": "",
    "uicon-play-left-fill": "",
    "uicon-play-right-fill": "",
    "uicon-rewind-left-fill": "",
    "uicon-rewind-right-fill": "",
    "uicon-arrow-downward": "",
    "uicon-arrow-leftward": "",
    "uicon-arrow-rightward": "",
    "uicon-arrow-upward": "",
    "uicon-arrow-down": "",
    "uicon-arrow-right": "",
    "uicon-arrow-left": "",
    "uicon-arrow-up": "",
    "uicon-skip-back-left": "",
    "uicon-skip-forward-right": "",
    "uicon-rewind-right": "",
    "uicon-rewind-left": "",
    "uicon-arrow-right-double": "",
    "uicon-arrow-left-double": "",
    "uicon-wifi-off": "",
    "uicon-wifi": "",
    "uicon-empty-data": "",
    "uicon-empty-history": "",
    "uicon-empty-list": "",
    "uicon-empty-page": "",
    "uicon-empty-order": "",
    "uicon-man": "",
    "uicon-woman": "",
    "uicon-man-add": "",
    "uicon-man-add-fill": "",
    "uicon-man-delete": "",
    "uicon-man-delete-fill": "",
    "uicon-zh": "",
    "uicon-en": ""
  };
  const props$a = defineMixin({
    props: {
      // 图标类名
      name: {
        type: String,
        default: () => defProps.icon.name
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: () => defProps.icon.color
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: () => defProps.icon.size
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: () => defProps.icon.bold
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: () => defProps.icon.index
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: () => defProps.icon.hoverClass
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: () => defProps.icon.customPrefix
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: () => defProps.icon.label
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: () => defProps.icon.labelPos
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: () => defProps.icon.labelSize
      },
      // label的颜色
      labelColor: {
        type: String,
        default: () => defProps.icon.labelColor
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: () => defProps.icon.space
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: () => defProps.icon.imgMode
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: () => defProps.icon.width
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: () => defProps.icon.height
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: () => defProps.icon.top
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: () => defProps.icon.stop
      }
    }
  });
  const _sfc_main$j = {
    name: "u-icon",
    data() {
      return {};
    },
    emits: ["click"],
    mixins: [mpMixin, mixin, props$a],
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: addUnit(this.size),
          lineHeight: addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: addUnit(this.top)
        };
        if (this.color && !config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? addUnit(this.width) : addUnit(this.size);
        style.height = this.height ? addUnit(this.height) : addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        if (this.customPrefix !== "uicon")
          return "";
        return icons["uicon-" + this.name] || this.name;
      }
    },
    methods: {
      addStyle,
      addUnit,
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-icon", ["u-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, $options.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, $options.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: $options.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? $options.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? $options.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? $options.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? $options.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-ac70166d"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-icon/u-icon.vue"]]);
  const props$9 = defineMixin({
    props: {
      // 是否细边框
      hairline: {
        type: Boolean,
        default: () => defProps.button.hairline
      },
      // 按钮的预置样式，info，primary，error，warning，success
      type: {
        type: String,
        default: () => defProps.button.type
      },
      // 按钮尺寸，large，normal，small，mini
      size: {
        type: String,
        default: () => defProps.button.size
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: () => defProps.button.shape
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: () => defProps.button.plain
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: () => defProps.button.disabled
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: () => defProps.button.loading
      },
      // 加载中提示文字
      loadingText: {
        type: [String, Number],
        default: () => defProps.button.loadingText
      },
      // 加载状态图标类型
      loadingMode: {
        type: String,
        default: () => defProps.button.loadingMode
      },
      // 加载图标大小
      loadingSize: {
        type: [String, Number],
        default: () => defProps.button.loadingSize
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: () => defProps.button.openType
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: () => defProps.button.formType
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: () => defProps.button.appParameter
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: () => defProps.button.hoverStopPropagation
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: () => defProps.button.lang
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: () => defProps.button.sessionFrom
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: () => defProps.button.sendMessageTitle
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: () => defProps.button.sendMessagePath
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: () => defProps.button.sendMessageImg
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: () => defProps.button.showMessageCard
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: () => defProps.button.dataName
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: () => defProps.button.throttleTime
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: () => defProps.button.hoverStartTime
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: () => defProps.button.hoverStayTime
      },
      // 按钮文字，之所以通过props传入，是因为slot传入的话
      // nvue中无法控制文字的样式
      text: {
        type: [String, Number],
        default: () => defProps.button.text
      },
      // 按钮图标
      icon: {
        type: String,
        default: () => defProps.button.icon
      },
      // 按钮图标
      iconColor: {
        type: String,
        default: () => defProps.button.icon
      },
      // 按钮颜色，支持传入linear-gradient渐变色
      color: {
        type: String,
        default: () => defProps.button.color
      }
    }
  });
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const _sfc_main$i = {
    name: "u-button",
    mixins: [mpMixin, mixin, props$9],
    data() {
      return {};
    },
    computed: {
      // 生成bem风格的类名
      bemClass() {
        if (!this.color) {
          return this.bem(
            "button",
            ["type", "shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        } else {
          return this.bem(
            "button",
            ["shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        }
      },
      loadingColor() {
        if (this.plain) {
          return this.color ? this.color : color[`u-${this.type}`];
        }
        if (this.type === "info") {
          return "#c9c9c9";
        }
        return "rgb(200, 200, 200)";
      },
      iconColorCom() {
        if (this.iconColor)
          return this.iconColor;
        if (this.plain) {
          return this.color ? this.color : this.type;
        } else {
          return this.type === "info" ? "#000000" : "#ffffff";
        }
      },
      baseColor() {
        let style = {};
        if (this.color) {
          style.color = this.plain ? this.color : "white";
          if (!this.plain) {
            style["background-color"] = this.color;
          }
          if (this.color.indexOf("gradient") !== -1) {
            style.borderTopWidth = 0;
            style.borderRightWidth = 0;
            style.borderBottomWidth = 0;
            style.borderLeftWidth = 0;
            if (!this.plain) {
              style.backgroundImage = this.color;
            }
          } else {
            style.borderColor = this.color;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
        }
        return style;
      },
      // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
      nvueTextStyle() {
        let style = {};
        if (this.type === "info") {
          style.color = "#323233";
        }
        if (this.color) {
          style.color = this.plain ? this.color : "white";
        }
        style.fontSize = this.textSize + "px";
        return style;
      },
      // 字体大小
      textSize() {
        let fontSize = 14, { size } = this;
        if (size === "large")
          fontSize = 16;
        if (size === "normal")
          fontSize = 14;
        if (size === "small")
          fontSize = 12;
        if (size === "mini")
          fontSize = 10;
        return fontSize;
      }
    },
    emits: [
      "click",
      "getphonenumber",
      "getuserinfo",
      "error",
      "opensetting",
      "launchapp",
      "agreeprivacyauthorization"
    ],
    methods: {
      addStyle,
      clickHandler() {
        if (!this.disabled && !this.loading) {
          throttle(() => {
            this.$emit("click");
          }, this.throttleTime);
        }
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      },
      agreeprivacyauthorization(res) {
        this.$emit("agreeprivacyauthorization", res);
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_0$3);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("button", {
      "hover-start-time": Number(_ctx.hoverStartTime),
      "hover-stay-time": Number(_ctx.hoverStayTime),
      "form-type": _ctx.formType,
      "open-type": _ctx.openType,
      "app-parameter": _ctx.appParameter,
      "hover-stop-propagation": _ctx.hoverStopPropagation,
      "send-message-title": _ctx.sendMessageTitle,
      "send-message-path": _ctx.sendMessagePath,
      lang: _ctx.lang,
      "data-name": _ctx.dataName,
      "session-from": _ctx.sessionFrom,
      "send-message-img": _ctx.sendMessageImg,
      "show-message-card": _ctx.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      onAgreeprivacyauthorization: _cache[5] || (_cache[5] = (...args) => $options.agreeprivacyauthorization && $options.agreeprivacyauthorization(...args)),
      "hover-class": !_ctx.disabled && !_ctx.loading ? "u-button--active" : "",
      class: vue.normalizeClass(["u-button u-reset-button", $options.bemClass]),
      style: vue.normalizeStyle([$options.baseColor, $options.addStyle(_ctx.customStyle)]),
      onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          vue.createVNode(_component_u_loading_icon, {
            mode: _ctx.loadingMode,
            size: _ctx.loadingSize * 1.15,
            color: $options.loadingColor
          }, null, 8, ["mode", "size", "color"]),
          vue.createElementVNode(
            "text",
            {
              class: "u-button__loading-text",
              style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
            },
            vue.toDisplayString(_ctx.loadingText || _ctx.text),
            5
            /* TEXT, STYLE */
          )
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            name: _ctx.icon,
            color: $options.iconColorCom,
            size: $options.textSize * 1.35,
            customStyle: { marginRight: "2px" }
          }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode(
              "text",
              {
                class: "u-button__text",
                style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
              },
              vue.toDisplayString(_ctx.text),
              5
              /* TEXT, STYLE */
            )
          ], true)
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ], 46, ["hover-start-time", "hover-stay-time", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "send-message-path", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class"]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-5ce41ee6"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-button/u-button.vue"]]);
  const props$8 = defineMixin({
    props: {
      // checkbox的名称
      name: {
        type: [String, Number, Boolean],
        default: () => defProps.checkbox.name
      },
      // 形状，square为方形，circle为圆型
      shape: {
        type: String,
        default: () => defProps.checkbox.shape
      },
      // 整体的大小
      size: {
        type: [String, Number],
        default: () => defProps.checkbox.size
      },
      // 是否默认选中
      checked: {
        type: Boolean,
        default: () => defProps.checkbox.checked
      },
      // 是否禁用
      disabled: {
        type: [String, Boolean],
        default: () => defProps.checkbox.disabled
      },
      // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
      activeColor: {
        type: String,
        default: () => defProps.checkbox.activeColor
      },
      // 未选中的颜色
      inactiveColor: {
        type: String,
        default: () => defProps.checkbox.inactiveColor
      },
      // 图标的大小，单位px
      iconSize: {
        type: [String, Number],
        default: () => defProps.checkbox.iconSize
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: () => defProps.checkbox.iconColor
      },
      // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
      label: {
        type: [String, Number],
        default: () => defProps.checkbox.label
      },
      // label的字体大小，px单位
      labelSize: {
        type: [String, Number],
        default: () => defProps.checkbox.labelSize
      },
      // label的颜色
      labelColor: {
        type: String,
        default: () => defProps.checkbox.labelColor
      },
      // 是否禁止点击提示语选中复选框
      labelDisabled: {
        type: [String, Boolean],
        default: () => defProps.checkbox.labelDisabled
      },
      // 是否独立使用
      usedAlone: {
        type: [Boolean],
        default: () => false
      }
    }
  });
  const _sfc_main$h = {
    name: "u-checkbox",
    mixins: [mpMixin, mixin, props$8],
    data() {
      return {
        isChecked: false,
        // 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
        // 故只能使用如此方法
        parentData: {
          iconSize: 12,
          labelDisabled: null,
          disabled: null,
          shape: "square",
          activeColor: null,
          inactiveColor: null,
          size: 18,
          modelValue: null,
          iconColor: null,
          placement: "row",
          borderBottom: false,
          iconPlacement: "left"
        }
      };
    },
    computed: {
      // 是否禁用，如果父组件u-radios-group禁用的话，将会忽略子组件的配置
      elDisabled() {
        return this.disabled !== "" ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
      },
      // 是否禁用label点击
      elLabelDisabled() {
        return this.labelDisabled !== "" ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
      },
      // 组件尺寸，对应size的值，默认值为21px
      elSize() {
        return this.size ? this.size : this.parentData.size ? this.parentData.size : 21;
      },
      // 组件的勾选图标的尺寸，默认12px
      elIconSize() {
        return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 12;
      },
      // 组件选中激活时的颜色
      elActiveColor() {
        return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "#2979ff";
      },
      // 组件选未中激活时的颜色
      elInactiveColor() {
        return this.inactiveColor ? this.inactiveColor : this.parentData.inactiveColor ? this.parentData.inactiveColor : "#c8c9cc";
      },
      // label的颜色
      elLabelColor() {
        return this.labelColor ? this.labelColor : this.parentData.labelColor ? this.parentData.labelColor : "#606266";
      },
      // 组件的形状
      elShape() {
        return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
      },
      // label大小
      elLabelSize() {
        return addUnit(this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : "15");
      },
      elIconColor() {
        const iconColor = this.iconColor ? this.iconColor : this.parentData.iconColor ? this.parentData.iconColor : "#ffffff";
        if (this.elDisabled) {
          return this.isChecked ? this.elInactiveColor : "transparent";
        } else {
          return this.isChecked ? iconColor : "transparent";
        }
      },
      iconClasses() {
        let classes = [];
        classes.push("u-checkbox__icon-wrap--" + this.elShape);
        if (this.elDisabled) {
          classes.push("u-checkbox__icon-wrap--disabled");
        }
        if (this.isChecked && this.elDisabled) {
          classes.push("u-checkbox__icon-wrap--disabled--checked");
        }
        return classes;
      },
      iconWrapStyle() {
        const style = {};
        style.backgroundColor = this.isChecked && !this.elDisabled ? this.elActiveColor : "#ffffff";
        style.borderColor = this.isChecked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor;
        style.width = addUnit(this.elSize);
        style.height = addUnit(this.elSize);
        if (!this.usedAlone) {
          if (this.parentData.iconPlacement === "right") {
            style.marginRight = 0;
          }
        }
        return style;
      },
      checkboxStyle() {
        const style = {};
        if (!this.usedAlone) {
          if (this.parentData.borderBottom && this.parentData.placement === "row") {
            error("检测到您将borderBottom设置为true，需要同时将u-checkbox-group的placement设置为column才有效");
          }
          if (this.parentData.borderBottom && this.parentData.placement === "column") {
            style.paddingBottom = "8px";
          }
        }
        return deepMerge$1(style, addStyle(this.customStyle));
      }
    },
    mounted() {
      this.init();
    },
    emits: ["change", "update:checked"],
    methods: {
      init() {
        if (!this.usedAlone) {
          this.updateParentData();
          if (!this.parent) {
            error("u-checkbox必须搭配u-checkbox-group组件使用");
          }
          const value = this.parentData.modelValue;
          if (this.checked) {
            this.isChecked = true;
          } else if (!this.usedAlone && test.array(value)) {
            this.isChecked = value.some((item) => {
              return item === this.name;
            });
          }
        } else {
          if (this.checked) {
            this.isChecked = true;
          }
        }
      },
      updateParentData() {
        this.getParentData("u-checkbox-group");
      },
      // 横向两端排列时，点击组件即可触发选中事件
      wrapperClickHandler(e) {
        if (!this.usedAlone) {
          this.parentData.iconPlacement === "right" && this.iconClickHandler(e);
        } else {
          this.iconClickHandler(e);
        }
      },
      // 点击图标
      iconClickHandler(e) {
        this.preventEvent(e);
        if (!this.elDisabled) {
          this.setRadioCheckedStatus();
        }
      },
      // 点击label
      labelClickHandler(e) {
        this.preventEvent(e);
        if (!this.elLabelDisabled && !this.elDisabled) {
          this.setRadioCheckedStatus();
        }
      },
      emitEvent() {
        this.$emit("change", this.isChecked);
        if (this.usedAlone) {
          this.$emit("update:checked", this.isChecked);
        }
        this.$nextTick(() => {
          formValidate(this, "change");
        });
      },
      // 改变组件选中状态
      // 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有u-checkbox实例
      // 将本组件外的其他u-checkbox的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
      setRadioCheckedStatus() {
        this.isChecked = !this.isChecked;
        this.emitEvent();
        if (!this.usedAlone) {
          typeof this.parent.unCheckedOther === "function" && this.parent.unCheckedOther(this);
        }
      }
    },
    watch: {
      checked(newValue, oldValue) {
        if (newValue !== this.isChecked) {
          this.isChecked = newValue;
        }
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-checkbox cursor-pointer", [`u-checkbox-label--${$data.parentData.iconPlacement}`, $data.parentData.borderBottom && $data.parentData.placement === "column" && "u-border-bottom"]]),
        style: vue.normalizeStyle([$options.checkboxStyle]),
        onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.wrapperClickHandler && $options.wrapperClickHandler(...args), ["stop"]))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-checkbox__icon-wrap cursor-pointer", $options.iconClasses]),
            onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.iconClickHandler && $options.iconClickHandler(...args), ["stop"])),
            style: vue.normalizeStyle([$options.iconWrapStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              vue.createVNode(_component_u_icon, {
                class: "u-checkbox__icon-wrap__icon",
                name: "checkbox-mark",
                size: $options.elIconSize,
                color: $options.elIconColor
              }, null, 8, ["size", "color"])
            ], true)
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createElementVNode("view", {
          class: "u-checkbox__label-wrap cursor-pointer",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.labelClickHandler && $options.labelClickHandler(...args), ["stop"]))
        }, [
          vue.renderSlot(_ctx.$slots, "label", {
            label: _ctx.label,
            elDisabled: $options.elDisabled
          }, () => [
            vue.createElementVNode(
              "text",
              {
                style: vue.normalizeStyle({
                  color: $options.elDisabled ? $options.elInactiveColor : $options.elLabelColor,
                  fontSize: $options.elLabelSize,
                  lineHeight: $options.elLabelSize
                })
              },
              vue.toDisplayString(_ctx.label),
              5
              /* TEXT, STYLE */
            )
          ], true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-41713600"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-checkbox/u-checkbox.vue"]]);
  const props$7 = defineMixin({
    props: {
      // 标识符
      name: {
        type: String,
        default: () => defProps.checkboxGroup.name
      },
      // 绑定的值
      modelValue: {
        type: Array,
        default: () => defProps.checkboxGroup.value
      },
      // 形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: () => defProps.checkboxGroup.shape
      },
      // 是否禁用全部checkbox
      disabled: {
        type: Boolean,
        default: () => defProps.checkboxGroup.disabled
      },
      // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
      activeColor: {
        type: String,
        default: () => defProps.checkboxGroup.activeColor
      },
      // 未选中的颜色
      inactiveColor: {
        type: String,
        default: () => defProps.checkboxGroup.inactiveColor
      },
      // 整个组件的尺寸，默认px
      size: {
        type: [String, Number],
        default: () => defProps.checkboxGroup.size
      },
      // 布局方式，row-横向，column-纵向
      placement: {
        type: String,
        default: () => defProps.checkboxGroup.placement
      },
      // label的字体大小，px单位
      labelSize: {
        type: [String, Number],
        default: () => defProps.checkboxGroup.labelSize
      },
      // label的字体颜色
      labelColor: {
        type: [String],
        default: () => defProps.checkboxGroup.labelColor
      },
      // 是否禁止点击文本操作
      labelDisabled: {
        type: Boolean,
        default: () => defProps.checkboxGroup.labelDisabled
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: () => defProps.checkboxGroup.iconColor
      },
      // 图标的大小，单位px
      iconSize: {
        type: [String, Number],
        default: () => defProps.checkboxGroup.iconSize
      },
      // 勾选图标的对齐方式，left-左边，right-右边
      iconPlacement: {
        type: String,
        default: () => defProps.checkboxGroup.iconPlacement
      },
      // 竖向配列时，是否显示下划线
      borderBottom: {
        type: Boolean,
        default: () => defProps.checkboxGroup.borderBottom
      }
    }
  });
  const _sfc_main$g = {
    name: "u-checkbox-group",
    mixins: [mpMixin, mixin, props$7],
    computed: {
      // 这里computed的变量，都是子组件u-checkbox需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
      // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(u-checkbox-group)
      // 拉取父组件新的变化后的参数
      parentData() {
        return [
          this.modelValue,
          this.disabled,
          this.inactiveColor,
          this.activeColor,
          this.size,
          this.labelDisabled,
          this.shape,
          this.iconSize,
          this.borderBottom,
          this.placement
        ];
      },
      bemClass() {
        return this.bem("checkbox-group", ["placement"]);
      }
    },
    watch: {
      // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
      parentData: {
        handler() {
          if (this.children.length) {
            this.children.map((child) => {
              typeof child.init === "function" && child.init();
            });
          }
        },
        deep: true
      }
    },
    data() {
      return {};
    },
    created() {
      this.children = [];
    },
    emits: ["update:modelValue", "change"],
    methods: {
      // 将其他的checkbox设置为未选中的状态
      unCheckedOther(childInstance) {
        const values = [];
        this.children.map((child) => {
          if (child.isChecked) {
            values.push(child.name);
          }
        });
        this.$emit("change", values);
        this.$emit("update:modelValue", values);
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-checkbox-group", $options.bemClass])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-ff0492f0"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.vue"]]);
  const props$6 = defineMixin({
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: () => defProps.transition.show
      },
      // 使用的动画模式
      mode: {
        type: String,
        default: () => defProps.transition.mode
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: () => defProps.transition.duration
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: () => defProps.transition.timingFunction
      }
    }
  });
  const getClassNames = (name) => ({
    enter: `u-${name}-enter u-${name}-enter-active`,
    "enter-to": `u-${name}-enter-to u-${name}-enter-active`,
    leave: `u-${name}-leave u-${name}-leave-active`,
    "leave-to": `u-${name}-leave-to u-${name}-leave-active`
  });
  const transitionMixin = {
    methods: {
      // 组件被点击发出事件
      clickHandler() {
        this.$emit("click");
      },
      // vue版本的组件进场处理
      async vueEnter() {
        const classNames = getClassNames(this.mode);
        this.status = "enter";
        this.$emit("beforeEnter");
        this.inited = true;
        this.display = true;
        this.classes = classNames.enter;
        await vue.nextTick();
        {
          await sleep(20);
          this.$emit("enter");
          this.transitionEnded = false;
          this.$emit("afterEnter");
          this.classes = classNames["enter-to"];
        }
      },
      // 动画离场处理
      async vueLeave() {
        if (!this.display)
          return;
        const classNames = getClassNames(this.mode);
        this.status = "leave";
        this.$emit("beforeLeave");
        this.classes = classNames.leave;
        await vue.nextTick();
        {
          this.transitionEnded = false;
          this.$emit("leave");
          setTimeout(this.onTransitionEnd, this.duration);
          this.classes = classNames["leave-to"];
        }
      },
      // 完成过渡后触发
      onTransitionEnd() {
        if (this.transitionEnded)
          return;
        this.transitionEnded = true;
        this.$emit(this.status === "leave" ? "afterLeave" : "afterEnter");
        if (!this.show && this.display) {
          this.display = false;
          this.inited = false;
        }
      }
    }
  };
  const _sfc_main$f = {
    name: "u-transition",
    data() {
      return {
        inited: false,
        // 是否显示/隐藏组件
        viewStyle: {},
        // 组件内部的样式
        status: "",
        // 记录组件动画的状态
        transitionEnded: false,
        // 组件是否结束的标记
        display: false,
        // 组件是否展示
        classes: ""
        // 应用的类名
      };
    },
    emits: ["click", "beforeEnter", "enter", "afterEnter", "beforeLeave", "leave", "afterLeave"],
    computed: {
      mergeStyle() {
        const { viewStyle, customStyle } = this;
        return {
          transitionDuration: `${this.duration}ms`,
          // display: `${this.display ? '' : 'none'}`,
          transitionTimingFunction: this.timingFunction,
          // 避免自定义样式影响到动画属性，所以写在viewStyle前面
          ...addStyle(customStyle),
          ...viewStyle
        };
      }
    },
    // 将mixin挂在到组件中，实际上为一个vue格式对象。
    mixins: [mpMixin, mixin, transitionMixin, props$6],
    watch: {
      show: {
        handler(newVal) {
          newVal ? this.vueEnter() : this.vueLeave();
        },
        // 表示同时监听初始化时的props的show的意思
        immediate: true
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.inited ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-transition", $data.classes]),
        ref: "u-transition",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
        style: vue.normalizeStyle([$options.mergeStyle]),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.noop && _ctx.noop(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-5cec8177"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-transition/u-transition.vue"]]);
  const props$5 = defineMixin({
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: () => defProps.overlay.show
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: () => defProps.overlay.zIndex
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: () => defProps.overlay.duration
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: () => defProps.overlay.opacity
      }
    }
  });
  const _sfc_main$e = {
    name: "u-overlay",
    mixins: [mpMixin, mixin, props$5],
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return deepMerge$1(style, addStyle(this.customStyle));
      }
    },
    emits: ["click"],
    methods: {
      clickHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_4$1);
    return vue.openBlock(), vue.createBlock(_component_u_transition, {
      show: _ctx.show,
      "custom-class": "u-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-9112bed9"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-overlay/u-overlay.vue"]]);
  const props$4 = defineMixin({
    props: {
      bgColor: {
        type: String,
        default: () => defProps.statusBar.bgColor
      }
    }
  });
  const _sfc_main$d = {
    name: "u-status-bar",
    mixins: [mpMixin, mixin, props$4],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = addUnit(sys().statusBarHeight, "px");
        style.backgroundColor = this.bgColor;
        return deepMerge$1(style, addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "u-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-eb8e0cdd"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-status-bar/u-status-bar.vue"]]);
  const props$3 = defineMixin({
    props: {}
  });
  const _sfc_main$c = {
    name: "u-safe-bottom",
    mixins: [mpMixin, mixin, props$3],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return deepMerge$1(style, addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-safe-bottom", [!$data.isNvue && "u-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-f3d22cfe"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-safe-bottom/u-safe-bottom.vue"]]);
  const props$2 = defineMixin({
    props: {
      // 是否展示弹窗
      show: {
        type: Boolean,
        default: () => defProps.popup.show
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: () => defProps.popup.overlay
      },
      // 弹出的方向，可选值为 top bottom right left center
      mode: {
        type: String,
        default: () => defProps.popup.mode
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: () => defProps.popup.duration
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: () => defProps.popup.closeable
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: () => defProps.popup.overlayStyle
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: () => defProps.popup.closeOnClickOverlay
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: () => defProps.popup.zIndex
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: () => defProps.popup.safeAreaInsetBottom
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: () => defProps.popup.safeAreaInsetTop
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: () => defProps.popup.closeIconPos
      },
      // 是否显示圆角
      round: {
        type: [Boolean, String, Number],
        default: () => defProps.popup.round
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: () => defProps.popup.zoom
      },
      // 弹窗背景色，设置为transparent可去除白色背景
      bgColor: {
        type: String,
        default: () => defProps.popup.bgColor
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: () => defProps.popup.overlayOpacity
      }
    }
  });
  const _sfc_main$b = {
    name: "u-popup",
    mixins: [mpMixin, mixin, props$2],
    data() {
      return {
        overlayDuration: this.duration + 50
      };
    },
    watch: {
      show(newValue, oldValue) {
      }
    },
    computed: {
      transitionStyle() {
        const style = {
          zIndex: this.zIndex,
          position: "fixed",
          display: "flex"
        };
        style[this.mode] = 0;
        if (this.mode === "left") {
          return deepMerge$1(style, {
            bottom: 0,
            top: 0
          });
        } else if (this.mode === "right") {
          return deepMerge$1(style, {
            bottom: 0,
            top: 0
          });
        } else if (this.mode === "top") {
          return deepMerge$1(style, {
            left: 0,
            right: 0
          });
        } else if (this.mode === "bottom") {
          return deepMerge$1(style, {
            left: 0,
            right: 0
          });
        } else if (this.mode === "center") {
          return deepMerge$1(style, {
            alignItems: "center",
            "justify-content": "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          });
        }
      },
      contentStyle() {
        const style = {};
        sys();
        if (this.mode !== "center") {
          style.flex = 1;
        }
        if (this.bgColor) {
          style.backgroundColor = this.bgColor;
        }
        if (this.round) {
          const value = addUnit(this.round);
          if (this.mode === "top") {
            style.borderBottomLeftRadius = value;
            style.borderBottomRightRadius = value;
          } else if (this.mode === "bottom") {
            style.borderTopLeftRadius = value;
            style.borderTopRightRadius = value;
          } else if (this.mode === "center") {
            style.borderRadius = value;
          }
        }
        return deepMerge$1(style, addStyle(this.customStyle));
      },
      position() {
        if (this.mode === "center") {
          return this.zoom ? "fade-zoom" : "fade";
        }
        if (this.mode === "left") {
          return "slide-left";
        }
        if (this.mode === "right") {
          return "slide-right";
        }
        if (this.mode === "bottom") {
          return "slide-up";
        }
        if (this.mode === "top") {
          return "slide-down";
        }
      }
    },
    emits: ["open", "close", "click", "update:show"],
    methods: {
      // 点击遮罩
      overlayClick() {
        if (this.closeOnClickOverlay) {
          this.$emit("update:show", false);
          this.$emit("close");
        }
      },
      close(e) {
        this.$emit("update:show", false);
        this.$emit("close");
      },
      afterEnter() {
        this.$emit("open");
      },
      clickHandler() {
        if (this.mode === "center") {
          this.overlayClick();
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_overlay = resolveEasycom(vue.resolveDynamicComponent("u-overlay"), __easycom_0);
    const _component_u_status_bar = resolveEasycom(vue.resolveDynamicComponent("u-status-bar"), __easycom_1$2);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$2);
    const _component_u_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("u-safe-bottom"), __easycom_3);
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_4$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-popup", [_ctx.customClass]])
      },
      [
        _ctx.overlay ? (vue.openBlock(), vue.createBlock(_component_u_overlay, {
          key: 0,
          show: _ctx.show,
          onClick: $options.overlayClick,
          zIndex: _ctx.zIndex,
          duration: $data.overlayDuration,
          customStyle: _ctx.overlayStyle,
          opacity: _ctx.overlayOpacity
        }, null, 8, ["show", "onClick", "zIndex", "duration", "customStyle", "opacity"])) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_u_transition, {
          show: _ctx.show,
          customStyle: $options.transitionStyle,
          mode: $options.position,
          duration: _ctx.duration,
          onAfterEnter: $options.afterEnter,
          onClick: $options.clickHandler
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              {
                class: "u-popup__content",
                style: vue.normalizeStyle([$options.contentStyle]),
                onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop"]))
              },
              [
                _ctx.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_u_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
                _ctx.closeable ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                    class: vue.normalizeClass(["u-popup__content__close", ["u-popup__content__close--" + _ctx.closeIconPos]]),
                    "hover-class": "u-popup__content__close--hover",
                    "hover-stay-time": "150"
                  },
                  [
                    vue.createVNode(_component_u_icon, {
                      name: "close",
                      color: "#909399",
                      size: "18",
                      bold: ""
                    })
                  ],
                  2
                  /* CLASS */
                )) : vue.createCommentVNode("v-if", true),
                _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_u_safe_bottom, { key: 2 })) : vue.createCommentVNode("v-if", true)
              ],
              4
              /* STYLE */
            )
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["show", "customStyle", "mode", "duration", "onAfterEnter", "onClick"])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-05c24e9b"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-popup/u-popup.vue"]]);
  const _sfc_main$a = {
    name: "u-calendar-header",
    mixins: [mpMixin, mixin],
    props: {
      // 标题
      title: {
        type: String,
        default: ""
      },
      // 副标题
      subtitle: {
        type: String,
        default: ""
      },
      // 是否显示标题
      showTitle: {
        type: Boolean,
        default: true
      },
      // 是否显示副标题
      showSubtitle: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {};
    },
    methods: {
      name() {
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-calendar-header u-border-bottom" }, [
      $props.showTitle ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: "u-calendar-header__title"
        },
        vue.toDisplayString($props.title),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      $props.showSubtitle ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 1,
          class: "u-calendar-header__subtitle"
        },
        vue.toDisplayString($props.subtitle),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "u-calendar-header__weekdays" }, [
        vue.createElementVNode("text", { class: "u-calendar-header__weekdays__weekday" }, "一"),
        vue.createElementVNode("text", { class: "u-calendar-header__weekdays__weekday" }, "二"),
        vue.createElementVNode("text", { class: "u-calendar-header__weekdays__weekday" }, "三"),
        vue.createElementVNode("text", { class: "u-calendar-header__weekdays__weekday" }, "四"),
        vue.createElementVNode("text", { class: "u-calendar-header__weekdays__weekday" }, "五"),
        vue.createElementVNode("text", { class: "u-calendar-header__weekdays__weekday" }, "六"),
        vue.createElementVNode("text", { class: "u-calendar-header__weekdays__weekday" }, "日")
      ])
    ]);
  }
  const uHeader = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-7f0f7602"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-calendar/header.vue"]]);
  var SECONDS_A_MINUTE = 60;
  var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
  var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
  var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
  var MILLISECONDS_A_SECOND = 1e3;
  var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
  var MS = "millisecond";
  var S = "second";
  var MIN = "minute";
  var H = "hour";
  var D = "day";
  var W = "week";
  var M = "month";
  var Q = "quarter";
  var Y = "year";
  var DATE = "date";
  var FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
  var INVALID_DATE_STRING = "Invalid Date";
  var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
  var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
  const en = {
    name: "en",
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    ordinal: function ordinal(n) {
      var s = ["th", "st", "nd", "rd"];
      var v = n % 100;
      return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
    }
  };
  var padStart = function padStart2(string2, length, pad) {
    var s = String(string2);
    if (!s || s.length >= length)
      return string2;
    return "" + Array(length + 1 - s.length).join(pad) + string2;
  };
  var padZoneStr = function padZoneStr2(instance) {
    var negMinutes = -instance.utcOffset();
    var minutes = Math.abs(negMinutes);
    var hourOffset = Math.floor(minutes / 60);
    var minuteOffset = minutes % 60;
    return (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
  };
  var monthDiff = function monthDiff2(a, b) {
    if (a.date() < b.date())
      return -monthDiff2(b, a);
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
    var anchor = a.clone().add(wholeMonthDiff, M);
    var c = b - anchor < 0;
    var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
    return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
  };
  var absFloor = function absFloor2(n) {
    return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
  };
  var prettyUnit = function prettyUnit2(u) {
    var special = {
      M,
      y: Y,
      w: W,
      d: D,
      D: DATE,
      h: H,
      m: MIN,
      s: S,
      ms: MS,
      Q
    };
    return special[u] || String(u || "").toLowerCase().replace(/s$/, "");
  };
  var isUndefined$1 = function isUndefined2(s) {
    return s === void 0;
  };
  const U = {
    s: padStart,
    z: padZoneStr,
    m: monthDiff,
    a: absFloor,
    p: prettyUnit,
    u: isUndefined$1
  };
  var L = "en";
  var Ls = {};
  Ls[L] = en;
  var IS_DAYJS = "$isDayjsObject";
  var isDayjs = function isDayjs2(d) {
    return d instanceof Dayjs || !!(d && d[IS_DAYJS]);
  };
  var parseLocale = function parseLocale2(preset, object2, isLocal) {
    var l;
    if (!preset)
      return L;
    if (typeof preset === "string") {
      var presetLower = preset.toLowerCase();
      if (Ls[presetLower]) {
        l = presetLower;
      }
      if (object2) {
        Ls[presetLower] = object2;
        l = presetLower;
      }
      var presetSplit = preset.split("-");
      if (!l && presetSplit.length > 1) {
        return parseLocale2(presetSplit[0]);
      }
    } else {
      var name = preset.name;
      Ls[name] = preset;
      l = name;
    }
    if (!isLocal && l)
      L = l;
    return l || !isLocal && L;
  };
  var dayjs = function dayjs2(date2, c) {
    if (isDayjs(date2)) {
      return date2.clone();
    }
    var cfg = typeof c === "object" ? c : {};
    cfg.date = date2;
    cfg.args = arguments;
    return new Dayjs(cfg);
  };
  var wrapper = function wrapper2(date2, instance) {
    return dayjs(date2, {
      locale: instance.$L,
      utc: instance.$u,
      x: instance.$x,
      $offset: instance.$offset
      // todo: refactor; do not use this.$offset in you code
    });
  };
  var Utils = U;
  Utils.l = parseLocale;
  Utils.i = isDayjs;
  Utils.w = wrapper;
  var parseDate = function parseDate2(cfg) {
    var date2 = cfg.date, utc = cfg.utc;
    if (date2 === null)
      return /* @__PURE__ */ new Date(NaN);
    if (Utils.u(date2))
      return /* @__PURE__ */ new Date();
    if (date2 instanceof Date)
      return new Date(date2);
    if (typeof date2 === "string" && !/Z$/i.test(date2)) {
      var d = date2.match(REGEX_PARSE);
      if (d) {
        var m = d[2] - 1 || 0;
        var ms = (d[7] || "0").substring(0, 3);
        if (utc) {
          return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
        }
        return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
      }
    }
    return new Date(date2);
  };
  var Dayjs = /* @__PURE__ */ function() {
    function Dayjs2(cfg) {
      this.$L = parseLocale(cfg.locale, null, true);
      this.parse(cfg);
      this.$x = this.$x || cfg.x || {};
      this[IS_DAYJS] = true;
    }
    var _proto = Dayjs2.prototype;
    _proto.parse = function parse(cfg) {
      this.$d = parseDate(cfg);
      this.init();
    };
    _proto.init = function init() {
      var $d = this.$d;
      this.$y = $d.getFullYear();
      this.$M = $d.getMonth();
      this.$D = $d.getDate();
      this.$W = $d.getDay();
      this.$H = $d.getHours();
      this.$m = $d.getMinutes();
      this.$s = $d.getSeconds();
      this.$ms = $d.getMilliseconds();
    };
    _proto.$utils = function $utils() {
      return Utils;
    };
    _proto.isValid = function isValid() {
      return !(this.$d.toString() === INVALID_DATE_STRING);
    };
    _proto.isSame = function isSame(that, units) {
      var other = dayjs(that);
      return this.startOf(units) <= other && other <= this.endOf(units);
    };
    _proto.isAfter = function isAfter(that, units) {
      return dayjs(that) < this.startOf(units);
    };
    _proto.isBefore = function isBefore(that, units) {
      return this.endOf(units) < dayjs(that);
    };
    _proto.$g = function $g(input, get, set) {
      if (Utils.u(input))
        return this[get];
      return this.set(set, input);
    };
    _proto.unix = function unix() {
      return Math.floor(this.valueOf() / 1e3);
    };
    _proto.valueOf = function valueOf() {
      return this.$d.getTime();
    };
    _proto.startOf = function startOf(units, _startOf) {
      var _this = this;
      var isStartOf = !Utils.u(_startOf) ? _startOf : true;
      var unit = Utils.p(units);
      var instanceFactory = function instanceFactory2(d, m) {
        var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
        return isStartOf ? ins : ins.endOf(D);
      };
      var instanceFactorySet = function instanceFactorySet2(method, slice) {
        var argumentStart = [0, 0, 0, 0];
        var argumentEnd = [23, 59, 59, 999];
        return Utils.w(_this.toDate()[method].apply(
          // eslint-disable-line prefer-spread
          _this.toDate("s"),
          (isStartOf ? argumentStart : argumentEnd).slice(slice)
        ), _this);
      };
      var $W = this.$W, $M = this.$M, $D = this.$D;
      var utcPad = "set" + (this.$u ? "UTC" : "");
      switch (unit) {
        case Y:
          return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
        case M:
          return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
        case W: {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }
        case D:
        case DATE:
          return instanceFactorySet(utcPad + "Hours", 0);
        case H:
          return instanceFactorySet(utcPad + "Minutes", 1);
        case MIN:
          return instanceFactorySet(utcPad + "Seconds", 2);
        case S:
          return instanceFactorySet(utcPad + "Milliseconds", 3);
        default:
          return this.clone();
      }
    };
    _proto.endOf = function endOf(arg) {
      return this.startOf(arg, false);
    };
    _proto.$set = function $set(units, _int) {
      var _C$D$C$DATE$C$M$C$Y$C;
      var unit = Utils.p(units);
      var utcPad = "set" + (this.$u ? "UTC" : "");
      var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
      var arg = unit === D ? this.$D + (_int - this.$W) : _int;
      if (unit === M || unit === Y) {
        var date2 = this.clone().set(DATE, 1);
        date2.$d[name](arg);
        date2.init();
        this.$d = date2.set(DATE, Math.min(this.$D, date2.daysInMonth())).$d;
      } else if (name)
        this.$d[name](arg);
      this.init();
      return this;
    };
    _proto.set = function set(string2, _int2) {
      return this.clone().$set(string2, _int2);
    };
    _proto.get = function get(unit) {
      return this[Utils.p(unit)]();
    };
    _proto.add = function add(number2, units) {
      var _this2 = this, _C$MIN$C$H$C$S$unit;
      number2 = Number(number2);
      var unit = Utils.p(units);
      var instanceFactorySet = function instanceFactorySet2(n) {
        var d = dayjs(_this2);
        return Utils.w(d.date(d.date() + Math.round(n * number2)), _this2);
      };
      if (unit === M) {
        return this.set(M, this.$M + number2);
      }
      if (unit === Y) {
        return this.set(Y, this.$y + number2);
      }
      if (unit === D) {
        return instanceFactorySet(1);
      }
      if (unit === W) {
        return instanceFactorySet(7);
      }
      var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
      var nextTimeStamp = this.$d.getTime() + number2 * step;
      return Utils.w(nextTimeStamp, this);
    };
    _proto.subtract = function subtract(number2, string2) {
      return this.add(number2 * -1, string2);
    };
    _proto.format = function format(formatStr) {
      var _this3 = this;
      var locale = this.$locale();
      if (!this.isValid())
        return locale.invalidDate || INVALID_DATE_STRING;
      var str = formatStr || FORMAT_DEFAULT;
      var zoneStr = Utils.z(this);
      var $H = this.$H, $m = this.$m, $M = this.$M;
      var weekdays = locale.weekdays, months = locale.months, meridiem = locale.meridiem;
      var getShort = function getShort2(arr, index2, full, length) {
        return arr && (arr[index2] || arr(_this3, str)) || full[index2].slice(0, length);
      };
      var get$H = function get$H2(num) {
        return Utils.s($H % 12 || 12, num, "0");
      };
      var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
        var m = hour < 12 ? "AM" : "PM";
        return isLowercase ? m.toLowerCase() : m;
      };
      var matches = function matches2(match) {
        switch (match) {
          case "YY":
            return String(_this3.$y).slice(-2);
          case "YYYY":
            return Utils.s(_this3.$y, 4, "0");
          case "M":
            return $M + 1;
          case "MM":
            return Utils.s($M + 1, 2, "0");
          case "MMM":
            return getShort(locale.monthsShort, $M, months, 3);
          case "MMMM":
            return getShort(months, $M);
          case "D":
            return _this3.$D;
          case "DD":
            return Utils.s(_this3.$D, 2, "0");
          case "d":
            return String(_this3.$W);
          case "dd":
            return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2);
          case "ddd":
            return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3);
          case "dddd":
            return weekdays[_this3.$W];
          case "H":
            return String($H);
          case "HH":
            return Utils.s($H, 2, "0");
          case "h":
            return get$H(1);
          case "hh":
            return get$H(2);
          case "a":
            return meridiemFunc($H, $m, true);
          case "A":
            return meridiemFunc($H, $m, false);
          case "m":
            return String($m);
          case "mm":
            return Utils.s($m, 2, "0");
          case "s":
            return String(_this3.$s);
          case "ss":
            return Utils.s(_this3.$s, 2, "0");
          case "SSS":
            return Utils.s(_this3.$ms, 3, "0");
          case "Z":
            return zoneStr;
        }
        return null;
      };
      return str.replace(REGEX_FORMAT, function(match, $1) {
        return $1 || matches(match) || zoneStr.replace(":", "");
      });
    };
    _proto.utcOffset = function utcOffset() {
      return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
    };
    _proto.diff = function diff(input, units, _float) {
      var _this4 = this;
      var unit = Utils.p(units);
      var that = dayjs(input);
      var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
      var diff2 = this - that;
      var getMonth = function getMonth2() {
        return Utils.m(_this4, that);
      };
      var result;
      switch (unit) {
        case Y:
          result = getMonth() / 12;
          break;
        case M:
          result = getMonth();
          break;
        case Q:
          result = getMonth() / 3;
          break;
        case W:
          result = (diff2 - zoneDelta) / MILLISECONDS_A_WEEK;
          break;
        case D:
          result = (diff2 - zoneDelta) / MILLISECONDS_A_DAY;
          break;
        case H:
          result = diff2 / MILLISECONDS_A_HOUR;
          break;
        case MIN:
          result = diff2 / MILLISECONDS_A_MINUTE;
          break;
        case S:
          result = diff2 / MILLISECONDS_A_SECOND;
          break;
        default:
          result = diff2;
          break;
      }
      return _float ? result : Utils.a(result);
    };
    _proto.daysInMonth = function daysInMonth() {
      return this.endOf(M).$D;
    };
    _proto.$locale = function $locale() {
      return Ls[this.$L];
    };
    _proto.locale = function locale(preset, object2) {
      if (!preset)
        return this.$L;
      var that = this.clone();
      var nextLocaleName = parseLocale(preset, object2, true);
      if (nextLocaleName)
        that.$L = nextLocaleName;
      return that;
    };
    _proto.clone = function clone2() {
      return Utils.w(this.$d, this);
    };
    _proto.toDate = function toDate() {
      return new Date(this.valueOf());
    };
    _proto.toJSON = function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    };
    _proto.toISOString = function toISOString() {
      return this.$d.toISOString();
    };
    _proto.toString = function toString2() {
      return this.$d.toUTCString();
    };
    return Dayjs2;
  }();
  var proto = Dayjs.prototype;
  dayjs.prototype = proto;
  [["$ms", MS], ["$s", S], ["$m", MIN], ["$H", H], ["$W", D], ["$M", M], ["$y", Y], ["$D", DATE]].forEach(function(g) {
    proto[g[1]] = function(input) {
      return this.$g(input, g[0], g[1]);
    };
  });
  dayjs.extend = function(plugin, option) {
    if (!plugin.$i) {
      plugin(option, Dayjs, dayjs);
      plugin.$i = true;
    }
    return dayjs;
  };
  dayjs.locale = parseLocale;
  dayjs.isDayjs = isDayjs;
  dayjs.unix = function(timestamp) {
    return dayjs(timestamp * 1e3);
  };
  dayjs.en = Ls[L];
  dayjs.Ls = Ls;
  dayjs.p = {};
  const _sfc_main$9 = {
    name: "u-calendar-month",
    mixins: [mpMixin, mixin],
    props: {
      // 是否显示月份背景色
      showMark: {
        type: Boolean,
        default: true
      },
      // 主题色，对底部按钮和选中日期有效
      color: {
        type: String,
        default: "#3c9cff"
      },
      // 月份数据
      months: {
        type: Array,
        default: () => []
      },
      // 日期选择类型
      mode: {
        type: String,
        default: "single"
      },
      // 日期行高
      rowHeight: {
        type: [String, Number],
        default: 58
      },
      // mode=multiple时，最多可选多少个日期
      maxCount: {
        type: [String, Number],
        default: Infinity
      },
      // mode=range时，第一个日期底部的提示文字
      startText: {
        type: String,
        default: "开始"
      },
      // mode=range时，最后一个日期底部的提示文字
      endText: {
        type: String,
        default: "结束"
      },
      // 默认选中的日期，mode为multiple或range是必须为数组格式
      defaultDate: {
        type: [Array, String, Date],
        default: null
      },
      // 最小的可选日期
      minDate: {
        type: [String, Number],
        default: 0
      },
      // 最大可选日期
      maxDate: {
        type: [String, Number],
        default: 0
      },
      // 如果没有设置maxDate，则往后推多少个月
      maxMonth: {
        type: [String, Number],
        default: 2
      },
      // 是否为只读状态，只读状态下禁止选择日期
      readonly: {
        type: Boolean,
        default: () => defProps.calendar.readonly
      },
      // 日期区间最多可选天数，默认无限制，mode = range时有效
      maxRange: {
        type: [Number, String],
        default: Infinity
      },
      // 范围选择超过最多可选天数时的提示文案，mode = range时有效
      rangePrompt: {
        type: String,
        default: ""
      },
      // 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
      showRangePrompt: {
        type: Boolean,
        default: true
      },
      // 是否允许日期范围的起止时间为同一天，mode = range时有效
      allowSameDay: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 每个日期的宽度
        width: 0,
        // 当前选中的日期item
        item: {},
        selected: []
      };
    },
    watch: {
      selectedChange: {
        immediate: true,
        handler(n) {
          this.setDefaultDate();
        }
      }
    },
    computed: {
      // 多个条件的变化，会引起选中日期的变化，这里统一管理监听
      selectedChange() {
        return [this.minDate, this.maxDate, this.defaultDate];
      },
      dayStyle(index1, index2, item) {
        return (index12, index22, item2) => {
          const style = {};
          let week = item2.week;
          const dayWidth = Number(parseFloat(this.width / 7).toFixed(3).slice(0, -1));
          style.height = addUnit(this.rowHeight);
          if (index22 === 0) {
            week = (week === 0 ? 7 : week) - 1;
            style.marginLeft = addUnit(week * dayWidth, "px");
          }
          if (this.mode === "range") {
            style.paddingLeft = 0;
            style.paddingRight = 0;
            style.paddingBottom = 0;
            style.paddingTop = 0;
          }
          return style;
        };
      },
      daySelectStyle() {
        return (index1, index2, item) => {
          let date2 = dayjs(item.date).format("YYYY-MM-DD"), style = {};
          if (this.selected.some((item2) => this.dateSame(item2, date2))) {
            style.backgroundColor = this.color;
          }
          if (this.mode === "single") {
            if (date2 === this.selected[0]) {
              style.borderTopLeftRadius = "3px";
              style.borderBottomLeftRadius = "3px";
              style.borderTopRightRadius = "3px";
              style.borderBottomRightRadius = "3px";
            }
          } else if (this.mode === "range") {
            if (this.selected.length >= 2) {
              const len = this.selected.length - 1;
              if (this.dateSame(date2, this.selected[0])) {
                style.borderTopLeftRadius = "3px";
                style.borderBottomLeftRadius = "3px";
              }
              if (this.dateSame(date2, this.selected[len])) {
                style.borderTopRightRadius = "3px";
                style.borderBottomRightRadius = "3px";
              }
              if (dayjs(date2).isAfter(dayjs(this.selected[0])) && dayjs(date2).isBefore(dayjs(this.selected[len]))) {
                style.backgroundColor = colorGradient(this.color, "#ffffff", 100)[90];
                style.opacity = 0.7;
              }
            } else if (this.selected.length === 1) {
              style.borderTopLeftRadius = "3px";
              style.borderBottomLeftRadius = "3px";
            }
          } else {
            if (this.selected.some((item2) => this.dateSame(item2, date2))) {
              style.borderTopLeftRadius = "3px";
              style.borderBottomLeftRadius = "3px";
              style.borderTopRightRadius = "3px";
              style.borderBottomRightRadius = "3px";
            }
          }
          return style;
        };
      },
      // 某个日期是否被选中
      textStyle() {
        return (item) => {
          const date2 = dayjs(item.date).format("YYYY-MM-DD"), style = {};
          if (this.selected.some((item2) => this.dateSame(item2, date2))) {
            style.color = "#ffffff";
          }
          if (this.mode === "range") {
            const len = this.selected.length - 1;
            if (dayjs(date2).isAfter(dayjs(this.selected[0])) && dayjs(date2).isBefore(dayjs(this.selected[len]))) {
              style.color = this.color;
            }
          }
          return style;
        };
      },
      // 获取底部的提示文字
      getBottomInfo() {
        return (index1, index2, item) => {
          const date2 = dayjs(item.date).format("YYYY-MM-DD");
          const bottomInfo = item.bottomInfo;
          if (this.mode === "range" && this.selected.length > 0) {
            if (this.selected.length === 1) {
              if (this.dateSame(date2, this.selected[0]))
                return this.startText;
              else
                return bottomInfo;
            } else {
              const len = this.selected.length - 1;
              if (this.dateSame(date2, this.selected[0]) && this.dateSame(date2, this.selected[1]) && len === 1) {
                return `${this.startText}/${this.endText}`;
              } else if (this.dateSame(date2, this.selected[0])) {
                return this.startText;
              } else if (this.dateSame(date2, this.selected[len])) {
                return this.endText;
              } else {
                return bottomInfo;
              }
            }
          } else {
            return bottomInfo;
          }
        };
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.$emit("monthSelected", this.selected);
        this.$nextTick(() => {
          sleep(10).then(() => {
            this.getWrapperWidth();
            this.getMonthRect();
          });
        });
      },
      // 判断两个日期是否相等
      dateSame(date1, date2) {
        return dayjs(date1).isSame(dayjs(date2));
      },
      // 获取月份数据区域的宽度，因为nvue不支持百分比，所以无法通过css设置每个日期item的宽度
      getWrapperWidth() {
        this.$uGetRect(".u-calendar-month-wrapper").then((size) => {
          this.width = size.width;
        });
      },
      getMonthRect() {
        const promiseAllArr = this.months.map((item, index2) => this.getMonthRectByPromise(
          `u-calendar-month-${index2}`
        ));
        Promise.all(promiseAllArr).then(
          (sizes) => {
            let height = 1;
            const topArr = [];
            for (let i = 0; i < this.months.length; i++) {
              topArr[i] = height;
              height += sizes[i].height;
            }
            this.$emit("updateMonthTop", topArr);
          }
        );
      },
      // 获取每个月份区域的尺寸
      getMonthRectByPromise(el) {
        return new Promise((resolve) => {
          this.$uGetRect(`.${el}`).then((size) => {
            resolve(size);
          });
        });
      },
      // 点击某一个日期
      clickHandler(index1, index2, item) {
        if (this.readonly) {
          return;
        }
        this.item = item;
        const date2 = dayjs(item.date).format("YYYY-MM-DD");
        if (item.disabled)
          return;
        let selected = deepClone(this.selected);
        if (this.mode === "single") {
          selected = [date2];
        } else if (this.mode === "multiple") {
          if (selected.some((item2) => this.dateSame(item2, date2))) {
            const itemIndex = selected.findIndex((item2) => item2 === date2);
            selected.splice(itemIndex, 1);
          } else {
            if (selected.length < this.maxCount)
              selected.push(date2);
          }
        } else {
          if (selected.length === 0 || selected.length >= 2) {
            selected = [date2];
          } else if (selected.length === 1) {
            const existsDate = selected[0];
            if (dayjs(date2).isBefore(existsDate)) {
              selected = [date2];
            } else if (dayjs(date2).isAfter(existsDate)) {
              if (dayjs(dayjs(date2).subtract(this.maxRange, "day")).isAfter(dayjs(selected[0])) && this.showRangePrompt) {
                if (this.rangePrompt) {
                  toast(this.rangePrompt);
                } else {
                  toast(`选择天数不能超过 ${this.maxRange} 天`);
                }
                return;
              }
              selected.push(date2);
              const startDate = selected[0];
              const endDate = selected[1];
              const arr = [];
              let i = 0;
              do {
                arr.push(dayjs(startDate).add(i, "day").format("YYYY-MM-DD"));
                i++;
              } while (dayjs(startDate).add(i, "day").isBefore(dayjs(endDate)));
              arr.push(endDate);
              selected = arr;
            } else {
              if (selected[0] === date2 && !this.allowSameDay)
                return;
              selected.push(date2);
            }
          }
        }
        this.setSelected(selected);
      },
      // 设置默认日期
      setDefaultDate() {
        if (!this.defaultDate) {
          const selected = [dayjs().format("YYYY-MM-DD")];
          return this.setSelected(selected, false);
        }
        let defaultDate = [];
        const minDate = this.minDate || dayjs().format("YYYY-MM-DD");
        const maxDate = this.maxDate || dayjs(minDate).add(this.maxMonth - 1, "month").format("YYYY-MM-DD");
        if (this.mode === "single") {
          if (!test.array(this.defaultDate)) {
            defaultDate = [dayjs(this.defaultDate).format("YYYY-MM-DD")];
          } else {
            defaultDate = [this.defaultDate[0]];
          }
        } else {
          if (!test.array(this.defaultDate))
            return;
          defaultDate = this.defaultDate;
        }
        defaultDate = defaultDate.filter((item) => {
          return dayjs(item).isAfter(dayjs(minDate).subtract(1, "day")) && dayjs(item).isBefore(dayjs(
            maxDate
          ).add(1, "day"));
        });
        this.setSelected(defaultDate, false);
      },
      setSelected(selected, event = true) {
        this.selected = selected;
        event && this.$emit("monthSelected", this.selected, "tap");
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-calendar-month-wrapper",
        ref: "u-calendar-month-wrapper"
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.months, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index2,
              class: vue.normalizeClass([`u-calendar-month-${index2}`]),
              ref_for: true,
              ref: `u-calendar-month-${index2}`,
              id: `month-${index2}`
            }, [
              index2 !== 0 ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: "u-calendar-month__title"
                },
                vue.toDisplayString(item.year) + "年" + vue.toDisplayString(item.month) + "月",
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "u-calendar-month__days" }, [
                $props.showMark ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "u-calendar-month__days__month-mark-wrapper"
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "u-calendar-month__days__month-mark-wrapper__text" },
                    vue.toDisplayString(item.month),
                    1
                    /* TEXT */
                  )
                ])) : vue.createCommentVNode("v-if", true),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(item.date, (item1, index1) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["u-calendar-month__days__day", [item1.selected && "u-calendar-month__days__day__select--selected"]]),
                      key: index1,
                      style: vue.normalizeStyle([$options.dayStyle(index2, index1, item1)]),
                      onClick: ($event) => $options.clickHandler(index2, index1, item1)
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "u-calendar-month__days__day__select",
                          style: vue.normalizeStyle([$options.daySelectStyle(index2, index1, item1)])
                        },
                        [
                          vue.createElementVNode(
                            "text",
                            {
                              class: vue.normalizeClass(["u-calendar-month__days__day__select__info", [item1.disabled && "u-calendar-month__days__day__select__info--disabled"]]),
                              style: vue.normalizeStyle([$options.textStyle(item1)])
                            },
                            vue.toDisplayString(item1.day),
                            7
                            /* TEXT, CLASS, STYLE */
                          ),
                          $options.getBottomInfo(index2, index1, item1) ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 0,
                              class: vue.normalizeClass(["u-calendar-month__days__day__select__buttom-info", [item1.disabled && "u-calendar-month__days__day__select__buttom-info--disabled"]]),
                              style: vue.normalizeStyle([$options.textStyle(item1)])
                            },
                            vue.toDisplayString($options.getBottomInfo(index2, index1, item1)),
                            7
                            /* TEXT, CLASS, STYLE */
                          )) : vue.createCommentVNode("v-if", true),
                          item1.dot ? (vue.openBlock(), vue.createElementBlock("text", {
                            key: 1,
                            class: "u-calendar-month__days__day__select__dot"
                          })) : vue.createCommentVNode("v-if", true)
                        ],
                        4
                        /* STYLE */
                      )
                    ], 14, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 10, ["id"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      512
      /* NEED_PATCH */
    );
  }
  const uMonth = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-3c847935"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-calendar/month.vue"]]);
  const props$1 = defineMixin({
    props: {
      // 日历顶部标题
      title: {
        type: String,
        default: () => defProps.calendar.title
      },
      // 是否显示标题
      showTitle: {
        type: Boolean,
        default: () => defProps.calendar.showTitle
      },
      // 是否显示副标题
      showSubtitle: {
        type: Boolean,
        default: () => defProps.calendar.showSubtitle
      },
      // 日期类型选择，single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
      mode: {
        type: String,
        default: () => defProps.calendar.mode
      },
      // mode=range时，第一个日期底部的提示文字
      startText: {
        type: String,
        default: () => defProps.calendar.startText
      },
      // mode=range时，最后一个日期底部的提示文字
      endText: {
        type: String,
        default: () => defProps.calendar.endText
      },
      // 自定义列表
      customList: {
        type: Array,
        default: () => defProps.calendar.customList
      },
      // 主题色，对底部按钮和选中日期有效
      color: {
        type: String,
        default: () => defProps.calendar.color
      },
      // 最小的可选日期
      minDate: {
        type: [String, Number],
        default: () => defProps.calendar.minDate
      },
      // 最大可选日期
      maxDate: {
        type: [String, Number],
        default: () => defProps.calendar.maxDate
      },
      // 默认选中的日期，mode为multiple或range是必须为数组格式
      defaultDate: {
        type: [Array, String, Date, null],
        default: () => defProps.calendar.defaultDate
      },
      // mode=multiple时，最多可选多少个日期
      maxCount: {
        type: [String, Number],
        default: () => defProps.calendar.maxCount
      },
      // 日期行高
      rowHeight: {
        type: [String, Number],
        default: () => defProps.calendar.rowHeight
      },
      // 日期格式化函数
      formatter: {
        type: [Function, null],
        default: () => defProps.calendar.formatter
      },
      // 是否显示农历
      showLunar: {
        type: Boolean,
        default: () => defProps.calendar.showLunar
      },
      // 是否显示月份背景色
      showMark: {
        type: Boolean,
        default: () => defProps.calendar.showMark
      },
      // 确定按钮的文字
      confirmText: {
        type: String,
        default: () => defProps.calendar.confirmText
      },
      // 确认按钮处于禁用状态时的文字
      confirmDisabledText: {
        type: String,
        default: () => defProps.calendar.confirmDisabledText
      },
      // 是否显示日历弹窗
      show: {
        type: Boolean,
        default: () => defProps.calendar.show
      },
      // 是否允许点击遮罩关闭日历
      closeOnClickOverlay: {
        type: Boolean,
        default: () => defProps.calendar.closeOnClickOverlay
      },
      // 是否为只读状态，只读状态下禁止选择日期
      readonly: {
        type: Boolean,
        default: () => defProps.calendar.readonly
      },
      // 	是否展示确认按钮
      showConfirm: {
        type: Boolean,
        default: () => defProps.calendar.showConfirm
      },
      // 日期区间最多可选天数，默认无限制，mode = range时有效
      maxRange: {
        type: [Number, String],
        default: () => defProps.calendar.maxRange
      },
      // 范围选择超过最多可选天数时的提示文案，mode = range时有效
      rangePrompt: {
        type: String,
        default: () => defProps.calendar.rangePrompt
      },
      // 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
      showRangePrompt: {
        type: Boolean,
        default: () => defProps.calendar.showRangePrompt
      },
      // 是否允许日期范围的起止时间为同一天，mode = range时有效
      allowSameDay: {
        type: Boolean,
        default: () => defProps.calendar.allowSameDay
      },
      // 圆角值
      round: {
        type: [Boolean, String, Number],
        default: () => defProps.calendar.round
      },
      // 最多展示月份数量
      monthNum: {
        type: [Number, String],
        default: 3
      }
    }
  });
  var Calendar = {
    /**
        * 农历1900-2100的润大小信息表
        * @Array Of Property
        * @return Hex
        */
    lunarInfo: [
      19416,
      19168,
      42352,
      21717,
      53856,
      55632,
      91476,
      22176,
      39632,
      21970,
      // 1900-1909
      19168,
      42422,
      42192,
      53840,
      119381,
      46400,
      54944,
      44450,
      38320,
      84343,
      // 1910-1919
      18800,
      42160,
      46261,
      27216,
      27968,
      109396,
      11104,
      38256,
      21234,
      18800,
      // 1920-1929
      25958,
      54432,
      59984,
      28309,
      23248,
      11104,
      100067,
      37600,
      116951,
      51536,
      // 1930-1939
      54432,
      120998,
      46416,
      22176,
      107956,
      9680,
      37584,
      53938,
      43344,
      46423,
      // 1940-1949
      27808,
      46416,
      86869,
      19872,
      42416,
      83315,
      21168,
      43432,
      59728,
      27296,
      // 1950-1959
      44710,
      43856,
      19296,
      43748,
      42352,
      21088,
      62051,
      55632,
      23383,
      22176,
      // 1960-1969
      38608,
      19925,
      19152,
      42192,
      54484,
      53840,
      54616,
      46400,
      46752,
      103846,
      // 1970-1979
      38320,
      18864,
      43380,
      42160,
      45690,
      27216,
      27968,
      44870,
      43872,
      38256,
      // 1980-1989
      19189,
      18800,
      25776,
      29859,
      59984,
      27480,
      23232,
      43872,
      38613,
      37600,
      // 1990-1999
      51552,
      55636,
      54432,
      55888,
      30034,
      22176,
      43959,
      9680,
      37584,
      51893,
      // 2000-2009
      43344,
      46240,
      47780,
      44368,
      21977,
      19360,
      42416,
      86390,
      21168,
      43312,
      // 2010-2019
      31060,
      27296,
      44368,
      23378,
      19296,
      42726,
      42208,
      53856,
      60005,
      54576,
      // 2020-2029
      23200,
      30371,
      38608,
      19195,
      19152,
      42192,
      118966,
      53840,
      54560,
      56645,
      // 2030-2039
      46496,
      22224,
      21938,
      18864,
      42359,
      42160,
      43600,
      111189,
      27936,
      44448,
      // 2040-2049
      /** Add By JJonline@JJonline.Cn**/
      84835,
      37744,
      18936,
      18800,
      25776,
      92326,
      59984,
      27424,
      108228,
      43744,
      // 2050-2059
      41696,
      53987,
      51552,
      54615,
      54432,
      55888,
      23893,
      22176,
      42704,
      21972,
      // 2060-2069
      21200,
      43448,
      43344,
      46240,
      46758,
      44368,
      21920,
      43940,
      42416,
      21168,
      // 2070-2079
      45683,
      26928,
      29495,
      27296,
      44368,
      84821,
      19296,
      42352,
      21732,
      53600,
      // 2080-2089
      59752,
      54560,
      55968,
      92838,
      22224,
      19168,
      43476,
      41680,
      53584,
      62034,
      // 2090-2099
      54560
    ],
    // 2100
    /**
        * 公历每个月份的天数普通表
        * @Array Of Property
        * @return Number
        */
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /**
        * 天干地支之天干速查表
        * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
        * @return Cn string
        */
    Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    /**
        * 天干地支之地支速查表
        * @Array Of Property
        * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
        * @return Cn string
        */
    Zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    /**
        * 天干地支之地支速查表<=>生肖
        * @Array Of Property
        * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
        * @return Cn string
        */
    Animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    /**
        * 24节气速查表
        * @Array Of Property
        * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
        * @return Cn string
        */
    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
    /**
        * 1900-2100各年的24节气日期速查表
        * @Array Of Property
        * @return 0x string For splice
        */
    sTermInfo: [
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "9778397bd19801ec9210c965cc920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd09801d98082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd197c36c9210c9274c91aa",
      "97b6b97bd19801ec95f8c965cc920e",
      "97bd09801d98082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec95f8c965cc920e",
      "97bcf97c3598082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd07f595b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "9778397bd19801ec9210c9274c920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd07f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd07f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bd07f1487f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c9274c920e",
      "97bcf7f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c91aa",
      "97b6b97bd197c36c9210c9274c920e",
      "97bcf7f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c920e",
      "97b6b7f0e47f531b0723b0b6fb0722",
      "7f0e37f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36b0b70c9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0787b0721",
      "7f0e27f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c91aa",
      "97b6b7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "977837f0e37f149b0723b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f5307f595b0b0bc920fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "977837f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0723b06bd",
      "7f07e7f0e37f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0723b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0723b06bd",
      "7f07e7f0e37f14998083b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14898082b0723b02d5",
      "7f07e7f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e36665b66aa89801e9808297c35",
      "665f67f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e36665b66a449801e9808297c35",
      "665f67f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e36665b66a449801e9808297c35",
      "665f67f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e26665b66a449801e9808297c35",
      "665f67f0e37f1489801eb072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722"
    ],
    /**
        * 数字转中文速查表
        * @Array Of Property
        * @trans ['日','一','二','三','四','五','六','七','八','九','十']
        * @return Cn string
        */
    nStr1: ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    /**
        * 日期转农历称呼速查表
        * @Array Of Property
        * @trans ['初','十','廿','卅']
        * @return Cn string
        */
    nStr2: ["初", "十", "廿", "卅"],
    /**
        * 月份转农历称呼速查表
        * @Array Of Property
        * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
        * @return Cn string
        */
    nStr3: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
    /**
        * 返回农历y年一整年的总天数
        * @param lunar Year
        * @return Number
        * @eg:var count = calendar.lYearDays(1987) ;//count=387
        */
    lYearDays: function(y) {
      var i;
      var sum = 348;
      for (i = 32768; i > 8; i >>= 1) {
        sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
      }
      return sum + this.leapDays(y);
    },
    /**
        * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
        * @param lunar Year
        * @return Number (0-12)
        * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
        */
    leapMonth: function(y) {
      return this.lunarInfo[y - 1900] & 15;
    },
    /**
        * 返回农历y年闰月的天数 若该年没有闰月则返回0
        * @param lunar Year
        * @return Number (0、29、30)
        * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
        */
    leapDays: function(y) {
      if (this.leapMonth(y)) {
        return this.lunarInfo[y - 1900] & 65536 ? 30 : 29;
      }
      return 0;
    },
    /**
        * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
        * @param lunar Year
        * @return Number (-1、29、30)
        * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
        */
    monthDays: function(y, m) {
      if (m > 12 || m < 1) {
        return -1;
      }
      return this.lunarInfo[y - 1900] & 65536 >> m ? 30 : 29;
    },
    /**
        * 返回公历(!)y年m月的天数
        * @param solar Year
        * @return Number (-1、28、29、30、31)
        * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
        */
    solarDays: function(y, m) {
      if (m > 12 || m < 1) {
        return -1;
      }
      var ms = m - 1;
      if (ms == 1) {
        return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
      } else {
        return this.solarMonth[ms];
      }
    },
    /**
       * 农历年份转换为干支纪年
       * @param  lYear 农历年的年份数
       * @return Cn string
       */
    toGanZhiYear: function(lYear) {
      var ganKey = (lYear - 3) % 10;
      var zhiKey = (lYear - 3) % 12;
      if (ganKey == 0)
        ganKey = 10;
      if (zhiKey == 0)
        zhiKey = 12;
      return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
    },
    /**
       * 公历月、日判断所属星座
       * @param  cMonth [description]
       * @param  cDay [description]
       * @return Cn string
       */
    toAstro: function(cMonth, cDay) {
      var s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "座";
    },
    /**
        * 传入offset偏移量返回干支
        * @param offset 相对甲子的偏移量
        * @return Cn string
        */
    toGanZhi: function(offset) {
      return this.Gan[offset % 10] + this.Zhi[offset % 12];
    },
    /**
        * 传入公历(!)y年获得该年第n个节气的公历日期
        * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
        * @return day Number
        * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
        */
    getTerm: function(y, n) {
      if (y < 1900 || y > 2100) {
        return -1;
      }
      if (n < 1 || n > 24) {
        return -1;
      }
      var _table = this.sTermInfo[y - 1900];
      var _info = [
        parseInt("0x" + _table.substr(0, 5)).toString(),
        parseInt("0x" + _table.substr(5, 5)).toString(),
        parseInt("0x" + _table.substr(10, 5)).toString(),
        parseInt("0x" + _table.substr(15, 5)).toString(),
        parseInt("0x" + _table.substr(20, 5)).toString(),
        parseInt("0x" + _table.substr(25, 5)).toString()
      ];
      var _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),
        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),
        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),
        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),
        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),
        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2)
      ];
      return parseInt(_calday[n - 1]);
    },
    /**
        * 传入农历数字月份返回汉语通俗表示法
        * @param lunar month
        * @return Cn string
        * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
        */
    toChinaMonth: function(m) {
      if (m > 12 || m < 1) {
        return -1;
      }
      var s = this.nStr3[m - 1];
      s += "月";
      return s;
    },
    /**
        * 传入农历日期数字返回汉字表示法
        * @param lunar day
        * @return Cn string
        * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
        */
    toChinaDay: function(d) {
      var s;
      switch (d) {
        case 10:
          s = "初十";
          break;
        case 20:
          s = "二十";
          break;
        case 30:
          s = "三十";
          break;
        default:
          s = this.nStr2[Math.floor(d / 10)];
          s += this.nStr1[d % 10];
      }
      return s;
    },
    /**
        * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
        * @param y year
        * @return Cn string
        * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
        */
    getAnimal: function(y) {
      return this.Animals[(y - 4) % 12];
    },
    /**
        * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
        * @param y  solar year
        * @param m  solar month
        * @param d  solar day
        * @return JSON object
        * @eg:__f__('log','at uni_modules/uview-plus/libs/util/calendar.js:381',calendar.solar2lunar(1987,11,01));
        */
    solar2lunar: function(y, m, d) {
      if (y < 1900 || y > 2100) {
        return -1;
      }
      if (y == 1900 && m == 1 && d < 31) {
        return -1;
      }
      if (!y) {
        var objDate = /* @__PURE__ */ new Date();
      } else {
        var objDate = new Date(y, parseInt(m) - 1, d);
      }
      var i;
      var leap = 0;
      var temp = 0;
      var y = objDate.getFullYear();
      var m = objDate.getMonth() + 1;
      var d = objDate.getDate();
      var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 864e5;
      for (i = 1900; i < 2101 && offset > 0; i++) {
        temp = this.lYearDays(i);
        offset -= temp;
      }
      if (offset < 0) {
        offset += temp;
        i--;
      }
      var isTodayObj = /* @__PURE__ */ new Date();
      var isToday = false;
      if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
        isToday = true;
      }
      var nWeek = objDate.getDay();
      var cWeek = this.nStr1[nWeek];
      if (nWeek == 0) {
        nWeek = 7;
      }
      var year = i;
      var leap = this.leapMonth(i);
      var isLeap = false;
      for (i = 1; i < 13 && offset > 0; i++) {
        if (leap > 0 && i == leap + 1 && isLeap == false) {
          --i;
          isLeap = true;
          temp = this.leapDays(year);
        } else {
          temp = this.monthDays(year, i);
        }
        if (isLeap == true && i == leap + 1) {
          isLeap = false;
        }
        offset -= temp;
      }
      if (offset == 0 && leap > 0 && i == leap + 1) {
        if (isLeap) {
          isLeap = false;
        } else {
          isLeap = true;
          --i;
        }
      }
      if (offset < 0) {
        offset += temp;
        --i;
      }
      var month = i;
      var day = offset + 1;
      var sm = m - 1;
      var gzY = this.toGanZhiYear(year);
      var firstNode = this.getTerm(y, m * 2 - 1);
      var secondNode = this.getTerm(y, m * 2);
      var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
      if (d >= firstNode) {
        gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
      }
      var isTerm = false;
      var Term = null;
      if (firstNode == d) {
        isTerm = true;
        Term = this.solarTerm[m * 2 - 2];
      }
      if (secondNode == d) {
        isTerm = true;
        Term = this.solarTerm[m * 2 - 1];
      }
      var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10;
      var gzD = this.toGanZhi(dayCyclical + d - 1);
      var astro = this.toAstro(m, d);
      return { "lYear": year, "lMonth": month, "lDay": day, "Animal": this.getAnimal(year), "IMonthCn": (isLeap ? "闰" : "") + this.toChinaMonth(month), "IDayCn": this.toChinaDay(day), "cYear": y, "cMonth": m, "cDay": d, "gzYear": gzY, "gzMonth": gzM, "gzDay": gzD, "isToday": isToday, "isLeap": isLeap, "nWeek": nWeek, "ncWeek": "星期" + cWeek, "isTerm": isTerm, "Term": Term, "astro": astro };
    },
    /**
        * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
        * @param y  lunar year
        * @param m  lunar month
        * @param d  lunar day
        * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
        * @return JSON object
        * @eg:__f__('log','at uni_modules/uview-plus/libs/util/calendar.js:500',calendar.lunar2solar(1987,9,10));
        */
    lunar2solar: function(y, m, d, isLeapMonth) {
      var isLeapMonth = !!isLeapMonth;
      var leapMonth = this.leapMonth(y);
      this.leapDays(y);
      if (isLeapMonth && leapMonth != m) {
        return -1;
      }
      if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
        return -1;
      }
      var day = this.monthDays(y, m);
      var _day = day;
      if (isLeapMonth) {
        _day = this.leapDays(y, m);
      }
      if (y < 1900 || y > 2100 || d > _day) {
        return -1;
      }
      var offset = 0;
      for (var i = 1900; i < y; i++) {
        offset += this.lYearDays(i);
      }
      var leap = 0;
      var isAdd = false;
      for (var i = 1; i < m; i++) {
        leap = this.leapMonth(y);
        if (!isAdd) {
          if (leap <= i && leap > 0) {
            offset += this.leapDays(y);
            isAdd = true;
          }
        }
        offset += this.monthDays(y, i);
      }
      if (isLeapMonth) {
        offset += day;
      }
      var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
      var calObj = new Date((offset + d - 31) * 864e5 + stmap);
      var cY = calObj.getUTCFullYear();
      var cM = calObj.getUTCMonth() + 1;
      var cD = calObj.getUTCDate();
      return this.solar2lunar(cY, cM, cD);
    }
  };
  const _sfc_main$8 = {
    name: "u-calendar",
    mixins: [mpMixin, mixin, props$1],
    components: {
      uHeader,
      uMonth
    },
    data() {
      return {
        // 需要显示的月份的数组
        months: [],
        // 在月份滚动区域中，当前视图中月份的index索引
        monthIndex: 0,
        // 月份滚动区域的高度
        listHeight: 0,
        // month组件中选择的日期数组
        selected: [],
        scrollIntoView: "",
        scrollIntoViewScroll: "",
        scrollTop: 0,
        // 过滤处理方法
        innerFormatter: (value) => value
      };
    },
    watch: {
      scrollIntoView: {
        immediate: true,
        handler(n) {
        }
      },
      selectedChange: {
        immediate: true,
        handler(n) {
          this.setMonth();
        }
      },
      // 打开弹窗时，设置月份数据
      show: {
        immediate: true,
        handler(n) {
          if (n) {
            this.setMonth();
          } else {
            this.scrollIntoView = "";
          }
        }
      }
    },
    computed: {
      // 由于maxDate和minDate可以为字符串(2021-10-10)，或者数值(时间戳)，但是dayjs如果接受字符串形式的时间戳会有问题，这里进行处理
      innerMaxDate() {
        return test.number(this.maxDate) ? Number(this.maxDate) : this.maxDate;
      },
      innerMinDate() {
        return test.number(this.minDate) ? Number(this.minDate) : this.minDate;
      },
      // 多个条件的变化，会引起选中日期的变化，这里统一管理监听
      selectedChange() {
        return [this.innerMinDate, this.innerMaxDate, this.defaultDate];
      },
      subtitle() {
        if (this.months.length) {
          return `${this.months[this.monthIndex].year}年${this.months[this.monthIndex].month}月`;
        } else {
          return "";
        }
      },
      buttonDisabled() {
        if (this.mode === "range") {
          if (this.selected.length <= 1) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    },
    mounted() {
      this.start = Date.now();
      this.init();
    },
    emits: ["confirm", "close"],
    methods: {
      addUnit,
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      // month组件内部选择日期后，通过事件通知给父组件
      monthSelected(e, scene = "init") {
        this.selected = e;
        if (!this.showConfirm) {
          if (this.mode === "multiple" || this.mode === "single" || this.mode === "range" && this.selected.length >= 2) {
            if (scene === "init") {
              return;
            }
            if (scene === "tap") {
              this.$emit("confirm", this.selected);
            }
          }
        }
      },
      init() {
        if (this.innerMaxDate && this.innerMinDate && new Date(this.innerMaxDate).getTime() < new Date(this.innerMinDate).getTime()) {
          return error("maxDate不能小于minDate时间");
        }
        this.listHeight = this.rowHeight * 5 + 30;
        this.setMonth();
      },
      close() {
        this.$emit("close");
      },
      // 点击确定按钮
      confirm() {
        if (!this.buttonDisabled) {
          this.$emit("confirm", this.selected);
        }
      },
      // 获得两个日期之间的月份数
      getMonths(minDate, maxDate) {
        const minYear = dayjs(minDate).year();
        const minMonth = dayjs(minDate).month() + 1;
        const maxYear = dayjs(maxDate).year();
        const maxMonth = dayjs(maxDate).month() + 1;
        return (maxYear - minYear) * 12 + (maxMonth - minMonth) + 1;
      },
      // 设置月份数据
      setMonth() {
        const minDate = this.innerMinDate || dayjs().valueOf();
        const maxDate = this.innerMaxDate || dayjs(minDate).add(this.monthNum - 1, "month").valueOf();
        const months = range(
          1,
          this.monthNum,
          this.getMonths(minDate, maxDate)
        );
        this.months = [];
        for (let i = 0; i < months; i++) {
          this.months.push({
            date: new Array(
              dayjs(minDate).add(i, "month").daysInMonth()
            ).fill(1).map((item, index2) => {
              let day = index2 + 1;
              const week = dayjs(minDate).add(i, "month").date(day).day();
              const date2 = dayjs(minDate).add(i, "month").date(day).format("YYYY-MM-DD");
              let bottomInfo = "";
              if (this.showLunar) {
                const lunar = Calendar.solar2lunar(
                  dayjs(date2).year(),
                  dayjs(date2).month() + 1,
                  dayjs(date2).date()
                );
                bottomInfo = lunar.IDayCn;
              }
              let config2 = {
                day,
                week,
                // 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
                disabled: dayjs(date2).isBefore(
                  dayjs(minDate).format("YYYY-MM-DD")
                ) || dayjs(date2).isAfter(
                  dayjs(maxDate).format("YYYY-MM-DD")
                ),
                // 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
                date: new Date(date2),
                bottomInfo,
                dot: false,
                month: dayjs(minDate).add(i, "month").month() + 1
              };
              const formatter = this.formatter || this.innerFormatter;
              return formatter(config2);
            }),
            // 当前所属的月份
            month: dayjs(minDate).add(i, "month").month() + 1,
            // 当前年份
            year: dayjs(minDate).add(i, "month").year()
          });
        }
      },
      // 滚动到默认设置的月份
      scrollIntoDefaultMonth(selected) {
        const _index = this.months.findIndex(({
          year,
          month
        }) => {
          month = padZero(month);
          return `${year}-${month}` === selected;
        });
        if (_index !== -1) {
          this.$nextTick(() => {
            this.scrollIntoView = `month-${_index}`;
            this.scrollIntoViewScroll = this.scrollIntoView;
          });
        }
      },
      // scroll-view滚动监听
      onScroll(event) {
        const scrollTop = Math.max(0, event.detail.scrollTop);
        for (let i = 0; i < this.months.length; i++) {
          if (scrollTop >= (this.months[i].top || this.listHeight)) {
            this.monthIndex = i;
            this.scrollIntoViewScroll = `month-${i}`;
          }
        }
      },
      // 更新月份的top值
      updateMonthTop(topArr = []) {
        topArr.map((item, index2) => {
          this.months[index2].top = item;
        });
        if (!this.defaultDate) {
          const selected2 = dayjs().format("YYYY-MM");
          this.scrollIntoDefaultMonth(selected2);
          return;
        }
        let selected = dayjs().format("YYYY-MM");
        if (!test.array(this.defaultDate)) {
          selected = dayjs(this.defaultDate).format("YYYY-MM");
        } else {
          selected = dayjs(this.defaultDate[0]).format("YYYY-MM");
        }
        this.scrollIntoDefaultMonth(selected);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uHeader = vue.resolveComponent("uHeader");
    const _component_uMonth = vue.resolveComponent("uMonth");
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$1);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$1);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      show: _ctx.show,
      mode: "bottom",
      closeable: "",
      onClose: $options.close,
      round: _ctx.round,
      closeOnClickOverlay: _ctx.closeOnClickOverlay
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "u-calendar" }, [
          vue.createVNode(_component_uHeader, {
            title: _ctx.title,
            subtitle: $options.subtitle,
            showSubtitle: _ctx.showSubtitle,
            showTitle: _ctx.showTitle
          }, null, 8, ["title", "subtitle", "showSubtitle", "showTitle"]),
          vue.createElementVNode("scroll-view", {
            style: vue.normalizeStyle({
              height: $options.addUnit($data.listHeight)
            }),
            "scroll-y": "",
            onScroll: _cache[0] || (_cache[0] = (...args) => $options.onScroll && $options.onScroll(...args)),
            "scroll-top": $data.scrollTop,
            scrollIntoView: $data.scrollIntoView
          }, [
            vue.createVNode(_component_uMonth, {
              color: _ctx.color,
              rowHeight: _ctx.rowHeight,
              showMark: _ctx.showMark,
              months: $data.months,
              mode: _ctx.mode,
              maxCount: _ctx.maxCount,
              startText: _ctx.startText,
              endText: _ctx.endText,
              defaultDate: _ctx.defaultDate,
              minDate: $options.innerMinDate,
              maxDate: $options.innerMaxDate,
              maxMonth: _ctx.monthNum,
              readonly: _ctx.readonly,
              maxRange: _ctx.maxRange,
              rangePrompt: _ctx.rangePrompt,
              showRangePrompt: _ctx.showRangePrompt,
              allowSameDay: _ctx.allowSameDay,
              ref: "month",
              onMonthSelected: $options.monthSelected,
              onUpdateMonthTop: $options.updateMonthTop
            }, null, 8, ["color", "rowHeight", "showMark", "months", "mode", "maxCount", "startText", "endText", "defaultDate", "minDate", "maxDate", "maxMonth", "readonly", "maxRange", "rangePrompt", "showRangePrompt", "allowSameDay", "onMonthSelected", "onUpdateMonthTop"])
          ], 44, ["scroll-top", "scrollIntoView"]),
          _ctx.showConfirm ? vue.renderSlot(_ctx.$slots, "footer", { key: 0 }, () => [
            vue.createElementVNode("view", { class: "u-calendar__confirm" }, [
              vue.createVNode(_component_u_button, {
                shape: "circle",
                text: $options.buttonDisabled ? _ctx.confirmDisabledText : _ctx.confirmText,
                color: _ctx.color,
                onClick: $options.confirm,
                disabled: $options.buttonDisabled
              }, null, 8, ["text", "color", "onClick", "disabled"])
            ])
          ], true) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "onClose", "round", "closeOnClickOverlay"]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-c9867878"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-calendar/u-calendar.vue"]]);
  const BASE_URL = "https://cpcx.gopc.top/api";
  uni.setStorageSync("baseUrl", BASE_URL);
  const request = (url2, method, data = {}, header = {}, timeout2 = 3e4) => {
    return new Promise((resolve, reject) => {
      const pages2 = getCurrentPages();
      const currentPage = pages2[pages2.length - 1];
      const currentPath = currentPage ? currentPage.route : "";
      const isSharePage = currentPath.includes("pages/share/");
      const token = uni.getStorageSync("token");
      const userName = uni.getStorageSync("userName");
      const isAuthApi = url2.includes("/api/user/register") || url2.includes("/api/user/login");
      if (!token && !userName && !isAuthApi && !isSharePage) {
        uni.showToast({
          title: "请先登录",
          icon: "none",
          duration: 2e3
        });
        uni.navigateTo({
          url: "/pages/login/login"
        });
        return;
      }
      const authHeader = token ? { "Authorization": `Bearer ${token}` } : {};
      uni.request({
        url: `${BASE_URL}${url2}`,
        method,
        data,
        timeout: url2 === "/aiChance" ? 12e4 : timeout2,
        header: {
          ...header,
          ...authHeader,
          "Content-Type": "application/json"
        },
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          uni.showToast({
            title: "请求失败",
            icon: "none"
          });
          reject(err);
        }
      });
    });
  };
  const uploadFile = (url2, filePath, formData = {}, timeout2 = 6e4) => {
    return new Promise((resolve, reject) => {
      const pages2 = getCurrentPages();
      const currentPage = pages2[pages2.length - 1];
      const currentPath = currentPage ? currentPage.route : "";
      const isSharePage = currentPath.includes("pages/share/");
      if (!uni.getStorageSync("userName") && url2 !== "/register" && url2 !== "/login" && !isSharePage) {
        uni.showToast({
          title: "请先登录",
          icon: "none",
          duration: 2e3
        });
        uni.navigateTo({
          url: "/pages/login/login"
        });
        return;
      }
      uni.uploadFile({
        url: `${BASE_URL}${url2}`,
        filePath,
        name: "file",
        formData,
        success: (uploadRes) => {
          const result = JSON.parse(uploadRes.data);
          resolve(result);
        },
        fail: (err) => {
          uni.showToast({
            title: "上传失败",
            icon: "none"
          });
          reject(err);
        }
      });
    });
  };
  uni.getStorageSync("baseUrl") || "http://101.126.90.167";
  const addLottery = (data) => {
    return request("/api/lottery", "POST", data);
  };
  const getLotteryByUser = (user, params = {}) => {
    return request(`/api/lottery/user/${user}`, "GET", params);
  };
  const deleteLottery = (id) => {
    return request(`/api/lottery/${id}`, "DELETE");
  };
  const checkPrize = () => {
    return request("/api/lottery/check-prize", "POST");
  };
  const registerUser = (data) => {
    return request("/api/user/register", "POST", data);
  };
  const loginUser = (data) => {
    return request("/api/user/login", "POST", data);
  };
  const getUserInfo = (username) => {
    return request(`/api/user/${username}`, "GET");
  };
  const updateUserInfo = (username, data) => {
    return request(`/api/user/updateUser`, "POST", data);
  };
  const calculateWinProbability = (params) => {
    return request("/api/lottery/probability", "GET", params);
  };
  const generateNumbers = (params) => {
    return request("/api/lottery/aiChance", "GET", params);
  };
  const uploadLotteryImage = (filePath, formData = {}) => {
    return uploadFile("/upload", filePath, formData);
  };
  const getUploadStatus = (uploadBatchId) => {
    return request("/upload/status", "GET", { uploadBatchId });
  };
  const ssqBallRed = [
    {
      name: "01"
    },
    {
      name: "02"
    },
    {
      name: "03"
    },
    {
      name: "04"
    },
    {
      name: "05"
    },
    {
      name: "06"
    },
    {
      name: "07"
    },
    {
      name: "08"
    },
    {
      name: "09"
    },
    {
      name: "10"
    },
    {
      name: "11"
    },
    {
      name: "12"
    },
    {
      name: "13"
    },
    {
      name: "14"
    },
    {
      name: "15"
    },
    {
      name: "16"
    },
    {
      name: "17"
    },
    {
      name: "18"
    },
    {
      name: "19"
    },
    {
      name: "20"
    },
    {
      name: "21"
    },
    {
      name: "22"
    },
    {
      name: "23"
    },
    {
      name: "24"
    },
    {
      name: "25"
    },
    {
      name: "26"
    },
    {
      name: "27"
    },
    {
      name: "28"
    },
    {
      name: "29"
    },
    {
      name: "30"
    },
    {
      name: "31"
    },
    {
      name: "32"
    },
    {
      name: "33"
    }
  ];
  const ssqBallBlue = [
    {
      name: "01"
    },
    {
      name: "02"
    },
    {
      name: "03"
    },
    {
      name: "04"
    },
    {
      name: "05"
    },
    {
      name: "06"
    },
    {
      name: "07"
    },
    {
      name: "08"
    },
    {
      name: "09"
    },
    {
      name: "10"
    },
    {
      name: "11"
    },
    {
      name: "12"
    },
    {
      name: "13"
    },
    {
      name: "14"
    },
    {
      name: "15"
    },
    {
      name: "16"
    }
  ];
  const dltBallRed = [
    {
      name: "01"
    },
    {
      name: "02"
    },
    {
      name: "03"
    },
    {
      name: "04"
    },
    {
      name: "05"
    },
    {
      name: "06"
    },
    {
      name: "07"
    },
    {
      name: "08"
    },
    {
      name: "09"
    },
    {
      name: "10"
    },
    {
      name: "11"
    },
    {
      name: "12"
    },
    {
      name: "13"
    },
    {
      name: "14"
    },
    {
      name: "15"
    },
    {
      name: "16"
    },
    {
      name: "17"
    },
    {
      name: "18"
    },
    {
      name: "19"
    },
    {
      name: "20"
    },
    {
      name: "21"
    },
    {
      name: "22"
    },
    {
      name: "23"
    },
    {
      name: "24"
    },
    {
      name: "25"
    },
    {
      name: "26"
    },
    {
      name: "27"
    },
    {
      name: "28"
    },
    {
      name: "29"
    },
    {
      name: "30"
    },
    {
      name: "31"
    },
    {
      name: "32"
    },
    {
      name: "33"
    },
    {
      name: "34"
    },
    {
      name: "35"
    }
  ];
  const dltBallBlue = [
    {
      name: "01"
    },
    {
      name: "02"
    },
    {
      name: "03"
    },
    {
      name: "04"
    },
    {
      name: "05"
    },
    {
      name: "06"
    },
    {
      name: "07"
    },
    {
      name: "08"
    },
    {
      name: "09"
    },
    {
      name: "10"
    },
    {
      name: "11"
    },
    {
      name: "12"
    }
  ];
  const { toString } = Object.prototype;
  function isArray(val) {
    return toString.call(val) === "[object Array]";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (let i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  function deepMerge() {
    const result = {};
    function assignValue(val, key) {
      if (typeof result[key] === "object" && typeof val === "object") {
        result[key] = deepMerge(result[key], val);
      } else if (typeof val === "object") {
        result[key] = deepMerge({}, val);
      } else {
        result[key] = val;
      }
    }
    for (let i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url2, params) {
    if (!params) {
      return url2;
    }
    let serializedParams;
    if (isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      const parts = [];
      forEach(params, (val, key) => {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (isArray(val)) {
          key = `${key}[]`;
        } else {
          val = [val];
        }
        forEach(val, (v) => {
          if (isDate(v)) {
            v = v.toISOString();
          } else if (isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(`${encode(key)}=${encode(v)}`);
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      const hashmarkIndex = url2.indexOf("#");
      if (hashmarkIndex !== -1) {
        url2 = url2.slice(0, hashmarkIndex);
      }
      url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url2;
  }
  function isAbsoluteURL(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}` : baseURL;
  }
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  function settle(resolve, reject, response) {
    const { validateStatus } = response.config;
    const status = response.statusCode;
    if (status && (!validateStatus || validateStatus(status))) {
      resolve(response);
    } else {
      reject(response);
    }
  }
  const mergeKeys$1 = (keys, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      }
    });
    return config3;
  };
  const adapter = (config2) => new Promise((resolve, reject) => {
    const fullPath = buildURL(buildFullPath(config2.baseURL, config2.url), config2.params);
    const _config = {
      url: fullPath,
      header: config2.header,
      complete: (response) => {
        config2.fullPath = fullPath;
        response.config = config2;
        try {
          if (typeof response.data === "string") {
            response.data = JSON.parse(response.data);
          }
        } catch (e) {
        }
        settle(resolve, reject, response);
      }
    };
    let requestTask;
    if (config2.method === "UPLOAD") {
      delete _config.header["content-type"];
      delete _config.header["Content-Type"];
      const otherConfig = {
        filePath: config2.filePath,
        name: config2.name
      };
      const optionalKeys = [
        "files",
        "timeout",
        "formData"
      ];
      requestTask = uni.uploadFile({ ..._config, ...otherConfig, ...mergeKeys$1(optionalKeys, config2) });
    } else if (config2.method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        _config.timeout = config2.timeout;
      }
      requestTask = uni.downloadFile(_config);
    } else {
      const optionalKeys = [
        "data",
        "method",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      requestTask = uni.request({ ..._config, ...mergeKeys$1(optionalKeys, config2) });
    }
    if (config2.getTask) {
      config2.getTask(requestTask, config2);
    }
  });
  const dispatchRequest = (config2) => adapter(config2);
  function InterceptorManager() {
    this.handlers = [];
  }
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  };
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager.prototype.forEach = function forEach2(fn) {
    this.handlers.forEach((h) => {
      if (h !== null) {
        fn(h);
      }
    });
  };
  const mergeKeys = (keys, globalsConfig, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      } else if (!isUndefined(globalsConfig[prop])) {
        config3[prop] = globalsConfig[prop];
      }
    });
    return config3;
  };
  const mergeConfig = (globalsConfig, config2 = {}) => {
    const method = config2.method || globalsConfig.method || "GET";
    let config3 = {
      baseURL: globalsConfig.baseURL || "",
      method,
      url: config2.url || "",
      params: config2.params || {},
      custom: { ...globalsConfig.custom || {}, ...config2.custom || {} },
      header: deepMerge(globalsConfig.header || {}, config2.header || {})
    };
    const defaultToConfig2Keys = ["getTask", "validateStatus"];
    config3 = { ...config3, ...mergeKeys(defaultToConfig2Keys, globalsConfig, config2) };
    if (method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        config3.timeout = config2.timeout;
      } else if (!isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else if (method === "UPLOAD") {
      delete config3.header["content-type"];
      delete config3.header["Content-Type"];
      const uploadKeys = [
        "files",
        "filePath",
        "name",
        "timeout",
        "formData"
      ];
      uploadKeys.forEach((prop) => {
        if (!isUndefined(config2[prop])) {
          config3[prop] = config2[prop];
        }
      });
      if (isUndefined(config3.timeout) && !isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else {
      const defaultsKeys = [
        "data",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      config3 = { ...config3, ...mergeKeys(defaultsKeys, globalsConfig, config2) };
    }
    return config3;
  };
  const defaults = {
    baseURL: "",
    header: {},
    method: "GET",
    dataType: "json",
    responseType: "text",
    custom: {},
    timeout: 6e4,
    sslVerify: true,
    firstIpv4: false,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  var clone = function() {
    function _instanceof(obj, type) {
      return type != null && obj instanceof type;
    }
    var nativeMap;
    try {
      nativeMap = Map;
    } catch (_) {
      nativeMap = function() {
      };
    }
    var nativeSet;
    try {
      nativeSet = Set;
    } catch (_) {
      nativeSet = function() {
      };
    }
    var nativePromise;
    try {
      nativePromise = Promise;
    } catch (_) {
      nativePromise = function() {
      };
    }
    function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
      if (typeof circular === "object") {
        depth = circular.depth;
        prototype = circular.prototype;
        includeNonEnumerable = circular.includeNonEnumerable;
        circular = circular.circular;
      }
      var allParents = [];
      var allChildren = [];
      var useBuffer = typeof Buffer != "undefined";
      if (typeof circular == "undefined")
        circular = true;
      if (typeof depth == "undefined")
        depth = Infinity;
      function _clone(parent2, depth2) {
        if (parent2 === null)
          return null;
        if (depth2 === 0)
          return parent2;
        var child;
        var proto2;
        if (typeof parent2 != "object") {
          return parent2;
        }
        if (_instanceof(parent2, nativeMap)) {
          child = new nativeMap();
        } else if (_instanceof(parent2, nativeSet)) {
          child = new nativeSet();
        } else if (_instanceof(parent2, nativePromise)) {
          child = new nativePromise(function(resolve, reject) {
            parent2.then(function(value) {
              resolve(_clone(value, depth2 - 1));
            }, function(err) {
              reject(_clone(err, depth2 - 1));
            });
          });
        } else if (clone2.__isArray(parent2)) {
          child = [];
        } else if (clone2.__isRegExp(parent2)) {
          child = new RegExp(parent2.source, __getRegExpFlags(parent2));
          if (parent2.lastIndex)
            child.lastIndex = parent2.lastIndex;
        } else if (clone2.__isDate(parent2)) {
          child = new Date(parent2.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent2)) {
          if (Buffer.from) {
            child = Buffer.from(parent2);
          } else {
            child = new Buffer(parent2.length);
            parent2.copy(child);
          }
          return child;
        } else if (_instanceof(parent2, Error)) {
          child = Object.create(parent2);
        } else {
          if (typeof prototype == "undefined") {
            proto2 = Object.getPrototypeOf(parent2);
            child = Object.create(proto2);
          } else {
            child = Object.create(prototype);
            proto2 = prototype;
          }
        }
        if (circular) {
          var index2 = allParents.indexOf(parent2);
          if (index2 != -1) {
            return allChildren[index2];
          }
          allParents.push(parent2);
          allChildren.push(child);
        }
        if (_instanceof(parent2, nativeMap)) {
          parent2.forEach(function(value, key) {
            var keyChild = _clone(key, depth2 - 1);
            var valueChild = _clone(value, depth2 - 1);
            child.set(keyChild, valueChild);
          });
        }
        if (_instanceof(parent2, nativeSet)) {
          parent2.forEach(function(value) {
            var entryChild = _clone(value, depth2 - 1);
            child.add(entryChild);
          });
        }
        for (var i in parent2) {
          var attrs = Object.getOwnPropertyDescriptor(parent2, i);
          if (attrs) {
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          try {
            var objProperty = Object.getOwnPropertyDescriptor(parent2, i);
            if (objProperty.set === "undefined") {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          } catch (e) {
            if (e instanceof TypeError) {
              continue;
            } else if (e instanceof ReferenceError) {
              continue;
            }
          }
        }
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(parent2);
          for (var i = 0; i < symbols.length; i++) {
            var symbol = symbols[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
            if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
              continue;
            }
            child[symbol] = _clone(parent2[symbol], depth2 - 1);
            Object.defineProperty(child, symbol, descriptor);
          }
        }
        if (includeNonEnumerable) {
          var allPropertyNames = Object.getOwnPropertyNames(parent2);
          for (var i = 0; i < allPropertyNames.length; i++) {
            var propertyName = allPropertyNames[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
            if (descriptor && descriptor.enumerable) {
              continue;
            }
            child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
            Object.defineProperty(child, propertyName, descriptor);
          }
        }
        return child;
      }
      return _clone(parent, depth);
    }
    clone2.clonePrototype = function clonePrototype(parent) {
      if (parent === null)
        return null;
      var c = function() {
      };
      c.prototype = parent;
      return new c();
    };
    function __objToStr(o) {
      return Object.prototype.toString.call(o);
    }
    clone2.__objToStr = __objToStr;
    function __isDate(o) {
      return typeof o === "object" && __objToStr(o) === "[object Date]";
    }
    clone2.__isDate = __isDate;
    function __isArray(o) {
      return typeof o === "object" && __objToStr(o) === "[object Array]";
    }
    clone2.__isArray = __isArray;
    function __isRegExp(o) {
      return typeof o === "object" && __objToStr(o) === "[object RegExp]";
    }
    clone2.__isRegExp = __isRegExp;
    function __getRegExpFlags(re) {
      var flags = "";
      if (re.global)
        flags += "g";
      if (re.ignoreCase)
        flags += "i";
      if (re.multiline)
        flags += "m";
      return flags;
    }
    clone2.__getRegExpFlags = __getRegExpFlags;
    return clone2;
  }();
  class Request {
    /**
    * @param {Object} arg - 全局配置
    * @param {String} arg.baseURL - 全局根路径
    * @param {Object} arg.header - 全局header
    * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
    * @param {String} arg.dataType = [json] - 全局默认的dataType
    * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
    * @param {Object} arg.custom - 全局默认的自定义参数
    * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
    * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
    * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
    * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
    * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
    */
    constructor(arg = {}) {
      if (!isPlainObject(arg)) {
        arg = {};
        formatAppLog("warn", "at uni_modules/uview-plus/libs/luch-request/core/Request.js:39", "设置全局参数必须接收一个Object");
      }
      this.config = clone({ ...defaults, ...arg });
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    /**
    * @Function
    * @param {Request~setConfigCallback} f - 设置全局默认配置
    */
    setConfig(f) {
      this.config = f(this.config);
    }
    middleware(config2) {
      config2 = mergeConfig(this.config, config2);
      const chain = [dispatchRequest, void 0];
      let promise2 = Promise.resolve(config2);
      this.interceptors.request.forEach((interceptor) => {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise2 = promise2.then(chain.shift(), chain.shift());
      }
      return promise2;
    }
    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
    request(config2 = {}) {
      return this.middleware(config2);
    }
    get(url2, options = {}) {
      return this.middleware({
        url: url2,
        method: "GET",
        ...options
      });
    }
    post(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "POST",
        ...options
      });
    }
    put(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "PUT",
        ...options
      });
    }
    delete(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "DELETE",
        ...options
      });
    }
    options(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "OPTIONS",
        ...options
      });
    }
    upload(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "UPLOAD";
      return this.middleware(config2);
    }
    download(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "DOWNLOAD";
      return this.middleware(config2);
    }
  }
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  let platform = "none";
  platform = "vue3";
  platform = "plus";
  const platform$1 = platform;
  const http = new Request();
  let themeType = ["primary", "success", "error", "warning", "info"];
  function setConfig(configs) {
    index.shallowMerge(config, configs.config || {});
    index.shallowMerge(defProps, configs.props || {});
    index.shallowMerge(color, configs.color || {});
    index.shallowMerge(zIndex, configs.zIndex || {});
  }
  index.setConfig = setConfig;
  const $u = {
    route,
    date: index.timeFormat,
    // 另名date
    colorGradient: colorGradient$1.colorGradient,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    colorToRgba: colorGradient$1.colorToRgba,
    test,
    type: themeType,
    http,
    config,
    // uview-plus配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    mixin,
    mpMixin,
    props: defProps,
    ...index,
    color,
    platform: platform$1
  };
  const install = (Vue2) => {
    uni.$u = $u;
    Vue2.config.globalProperties.$u = $u;
    Vue2.mixin(mixin);
  };
  const uviewPlus = {
    install
  };
  const primaryButtonStyle = {
    backgroundColor: "#28a745",
    // 绿色
    color: "#fff",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    height: "36px",
    lineHeight: "36px"
  };
  const secondaryButtonStyle = {
    backgroundColor: "#fff",
    // 白色
    color: "#28a745",
    border: "1px solid #28a745",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    height: "36px",
    lineHeight: "36px"
  };
  const dangerButtonStyle = {
    width: "100%",
    height: "88rpx",
    borderRadius: "44rpx",
    background: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
    border: "none",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "30rpx",
    letterSpacing: "2rpx",
    boxShadow: "0 8rpx 20rpx rgba(255, 107, 107, 0.3)",
    transition: "all 0.3s ease"
  };
  const aiButtonStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    height: "40px",
    minWidth: "100px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    ":hover": {
      background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)"
    },
    ":active": {
      transform: "translateY(0) scale(0.98)",
      boxShadow: "0 2px 10px rgba(102, 126, 234, 0.4)"
    },
    ":before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
      transition: "left 0.5s ease"
    },
    ":hover:before": {
      left: "100%"
    }
  };
  const smallButtonStyle = {
    height: "60rpx",
    borderRadius: "30rpx",
    background: "linear-gradient(135deg, #ffd1d1 0%, #fff0b3 100%)",
    border: "none",
    color: "#4a5568",
    fontWeight: "500",
    fontSize: "24rpx",
    letterSpacing: "1rpx",
    boxShadow: "0 4rpx 10rpx rgba(255, 209, 209, 0.3)",
    transition: "all 0.3s ease",
    padding: "0 30rpx"
  };
  const miniButtonStyle = {
    height: "48rpx",
    borderRadius: "24rpx",
    background: "linear-gradient(135deg, #ffe8cc 0%, #ffcccb 100%)",
    border: "none",
    color: "#4a5568",
    fontWeight: "500",
    fontSize: "22rpx",
    letterSpacing: "1rpx",
    boxShadow: "0 4rpx 10rpx rgba(255, 232, 204, 0.3)",
    transition: "all 0.3s ease",
    padding: "0 20rpx"
  };
  const logoutButtonStyle = {
    background: "#ffffff",
    color: "#989898",
    border: "1px solid #dcdcdc",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    height: "36px",
    minWidth: "80px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      background: "#dc2626",
      borderColor: "#dc2626"
    },
    ":active": {
      background: "#b91c1c",
      borderColor: "#b91c1c",
      transform: "scale(0.95)"
    }
  };
  const saveButtonStyle = {
    backgroundColor: "#ff7777",
    // 绿色
    color: "#fff",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    height: "36px",
    lineHeight: "36px",
    border: "1px solid #e1e1e1"
  };
  const _sfc_main$7 = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const date2 = vue.ref("");
      const current = vue.ref(0);
      const show = vue.ref(false);
      const checkRedBoxValue = vue.ref([]);
      const checkBlueBoxValue = vue.ref([]);
      const submitting = vue.ref(false);
      const winningProbability = vue.ref(null);
      const calculating = vue.ref(false);
      const latestData = vue.ref([]);
      const loadingLatestData = vue.ref(false);
      const aiLoading = vue.ref(false);
      const uploading = vue.ref(false);
      const list = vue.reactive(["双色球", "大乐透"]);
      const minDate = (/* @__PURE__ */ new Date()).getTime();
      const cpForm = vue.ref({
        user: uni.getStorageSync("userName"),
        redBall: "",
        blueBall: "",
        openTime: "",
        type: "ssq",
        winChance: 0
      });
      const redBallArr = vue.ref(ssqBallRed);
      const blueBallArr = vue.ref(ssqBallBlue);
      const rest = () => {
        if (probabilityTimer)
          clearTimeout(probabilityTimer);
        probabilityTimer = null;
        checkRedBoxValue.value = [];
        checkBlueBoxValue.value = [];
        cpForm.value.redBall = "";
        cpForm.value.blueBall = "";
        cpForm.value.openTime = timeFormat(/* @__PURE__ */ new Date(), "yyyy-mm-dd");
        cpForm.value.type = "ssq";
        cpForm.value.winChance = 0;
        redBallArr.value = ssqBallRed;
        blueBallArr.value = ssqBallBlue;
        winningProbability.value = null;
        calculating.value = false;
      };
      const selectDate = (arr) => {
        const d = arr[0];
        date2.value = d;
        cpForm.value.openTime = d;
        show.value = false;
      };
      const redBoxChange = (arr) => {
        checkRedBoxValue.value = arr;
        cpForm.value.redBall = arr.join(",");
        calculateWinningProbability();
      };
      const blueBoxChange = (arr) => {
        checkBlueBoxValue.value = arr;
        cpForm.value.blueBall = arr.join(",");
        calculateWinningProbability();
      };
      let probabilityTimer = null;
      const calculateWinningProbability = () => {
        if (probabilityTimer)
          clearTimeout(probabilityTimer);
        const isSSQ = cpForm.value.type === "ssq";
        const requiredRed = isSSQ ? 6 : 5;
        const requiredBlue = isSSQ ? 1 : 2;
        const isComplete = checkRedBoxValue.value.length === requiredRed && checkBlueBoxValue.value.length === requiredBlue;
        if (!isComplete) {
          winningProbability.value = null;
          return;
        }
        calculating.value = true;
        winningProbability.value = null;
        probabilityTimer = setTimeout(() => {
          const red = checkRedBoxValue.value.join(",");
          const blue = checkBlueBoxValue.value.join(",");
          const number2 = `${red}+${blue}`;
          calculateWinProbability({ number: number2, type: cpForm.value.type }).then((res) => {
            if (res.code === 2e4 || res.code === 200) {
              winningProbability.value = res.data || 0;
            } else {
              winningProbability.value = 0;
            }
            calculating.value = false;
          }).catch((err) => {
            formatAppLog("error", "at pages/index/index.vue:394", "AI 计算失败", err);
            winningProbability.value = 0;
            calculating.value = false;
          });
        }, 300);
      };
      const changeType = (idx) => {
        if (probabilityTimer)
          clearTimeout(probabilityTimer);
        probabilityTimer = null;
        current.value = idx;
        rest();
        if (idx === 0) {
          redBallArr.value = ssqBallRed;
          blueBallArr.value = ssqBallBlue;
          cpForm.value.type = "ssq";
        } else {
          redBallArr.value = dltBallRed;
          blueBallArr.value = dltBallBlue;
          cpForm.value.type = "dlt";
        }
        loadLatestData();
      };
      const aiSelectNumbers = () => {
        if (aiLoading.value)
          return;
        aiLoading.value = true;
        uni.showLoading({
          title: "AI智能选号中...",
          mask: true
        });
        generateNumbers({ type: cpForm.value.type }).then((res) => {
          uni.hideLoading();
          if ((res.code === 2e4 || res.code === 200) && res.data) {
            let redBallsArray = [];
            let blueBallsArray = [];
            if (res.data.redBalls && Array.isArray(res.data.redBalls)) {
              redBallsArray = res.data.redBalls;
            }
            if (res.data.blueBalls && Array.isArray(res.data.blueBalls)) {
              blueBallsArray = res.data.blueBalls;
            }
            formatAppLog("log", "at pages/index/index.vue:451", "API返回的红球:", redBallsArray);
            formatAppLog("log", "at pages/index/index.vue:452", "API返回的蓝球:", blueBallsArray);
            const formattedRedBalls = redBallsArray.map((ball) => {
              if (typeof ball === "number") {
                return String(ball).padStart(2, "0");
              }
              return String(ball).padStart(2, "0");
            });
            const formattedBlueBalls = blueBallsArray.map((ball) => {
              if (typeof ball === "number") {
                return String(ball).padStart(2, "0");
              }
              return String(ball).padStart(2, "0");
            });
            formatAppLog("log", "at pages/index/index.vue:473", "格式化后的红球:", formattedRedBalls);
            formatAppLog("log", "at pages/index/index.vue:474", "格式化后的蓝球:", formattedBlueBalls);
            checkRedBoxValue.value = [...formattedRedBalls];
            checkBlueBoxValue.value = [...formattedBlueBalls];
            cpForm.value.redBall = formattedRedBalls.join(",");
            cpForm.value.blueBall = formattedBlueBalls.join(",");
            calculateWinningProbability();
            uni.showToast({
              title: "AI选号成功",
              icon: "success",
              duration: 2e3
            });
          } else {
            formatAppLog("error", "at pages/index/index.vue:492", "AI选号接口返回错误:", res);
            uni.showToast({
              title: res.message || `AI选号失败(${res.code || "未知错误"})`,
              icon: "none",
              duration: 2e3
            });
          }
        }).catch((err) => {
          uni.hideLoading();
          formatAppLog("error", "at pages/index/index.vue:504", "AI选号失败", err);
          uni.showToast({
            title: "AI选号失败，请稍后再试",
            icon: "none",
            duration: 2e3
          });
        }).finally(() => {
          aiLoading.value = false;
        });
      };
      const submitNum = () => {
        const minRed = cpForm.value.type === "ssq" ? 6 : 5;
        const minBlue = cpForm.value.type === "ssq" ? 1 : 2;
        const redCount = cpForm.value.redBall ? cpForm.value.redBall.split(",").length : 0;
        const blueCount = cpForm.value.blueBall ? cpForm.value.blueBall.split(",").length : 0;
        if (redCount < minRed) {
          uni.showToast({ title: `红球至少选择${minRed}个`, icon: "none" });
          return;
        }
        if (blueCount < minBlue) {
          uni.showToast({ title: `蓝球至少选择${minBlue}个`, icon: "none" });
          return;
        }
        if (!cpForm.value.openTime) {
          uni.showToast({ title: "请选择开奖时间", icon: "none" });
          return;
        }
        cpForm.value.winChance = winningProbability.value || 0;
        submitting.value = true;
        addLottery(cpForm.value).then((res) => {
          if (res.code === 2e4 || res.code === 200) {
            uni.showToast({ title: "添加成功", icon: "success" });
            if (res.data) {
              const today = timeFormat(/* @__PURE__ */ new Date(), "yyyy-mm-dd");
              if (Array.isArray(res.data)) {
                latestData.value = res.data.filter((it) => it.openTime >= today);
              } else if (typeof res.data === "object" && res.data.openTime >= today) {
                latestData.value = [res.data, ...latestData.value];
              }
              rest();
            } else {
              loadLatestData();
            }
          } else {
            uni.showToast({ title: res.message || "添加失败", icon: "error" });
          }
        }).finally(() => submitting.value = false);
      };
      const loadLatestData = () => {
        if (!cpForm.value.user)
          return;
        loadingLatestData.value = true;
        const today = timeFormat(/* @__PURE__ */ new Date(), "yyyy-mm-dd");
        getLotteryByUser(cpForm.value.user).then((res) => {
          if (res.code === 2e4 || res.code === 200) {
            latestData.value = (res.data || []).filter((it) => it.openTime >= today);
          }
          loadingLatestData.value = false;
        }).catch((err) => {
          formatAppLog("error", "at pages/index/index.vue:584", "获取列表失败", err);
          uni.showToast({ title: "加载数据失败", icon: "none" });
          loadingLatestData.value = false;
        });
      };
      const confirmDelete = (item) => {
        uni.showModal({
          title: "确认删除",
          content: "确定要删除这条记录吗？",
          success(res) {
            if (res.confirm)
              deleteData(item);
          }
        });
      };
      const deleteData = (item) => {
        deleteLottery(item.id).then((res) => {
          if (res.code === 200) {
            uni.showToast({ title: "删除成功", icon: "success" });
            loadLatestData();
          } else {
            uni.showToast({ title: res.message || "删除失败", icon: "error" });
          }
        }).catch((err) => {
          formatAppLog("error", "at pages/index/index.vue:611", "删除失败", err);
          uni.showToast({ title: "删除失败", icon: "error" });
        });
      };
      vue.onMounted(() => {
        cpForm.value.openTime = timeFormat(/* @__PURE__ */ new Date(), "yyyy-mm-dd");
        cpForm.value.user = uni.getStorageSync("userName") || "";
        if (!cpForm.value.user) {
          uni.showToast({ title: "请先登录", icon: "none", duration: 2e3 });
          uni.navigateTo({ url: "/pages/login/login" });
        } else {
          loadLatestData();
        }
      });
      const chooseImage = () => {
        if (uploading.value)
          return;
        uni.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["camera", "album"],
          success: (res) => {
            const tempFilePath = res.tempFilePaths[0];
            uploadFile2(tempFilePath);
          },
          fail: (err) => {
            formatAppLog("error", "at pages/index/index.vue:641", "选择图片失败", err);
            uni.showToast({
              title: "选择图片失败",
              icon: "none"
            });
          }
        });
      };
      const refreshData = () => {
        loadLatestData();
      };
      const uploadFile2 = (filePath) => {
        uploading.value = true;
        uni.showLoading({
          title: "上传中...",
          mask: true
        });
        const formData = {
          userName: cpForm.value.user,
          type: cpForm.value.type
        };
        const uploadPromise = uploadLotteryImage(filePath, formData);
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("上传超时，请检查网络")), 6e4);
        });
        Promise.race([uploadPromise, timeoutPromise]).then((res) => {
          var _a;
          uni.hideLoading();
          if (res.code === 200) {
            ((_a = res.data) == null ? void 0 : _a.uploadBatchId) || res.uploadBatchId;
            uni.showToast({
              title: "上传成功",
              icon: "success",
              duration: 1500
            });
            setTimeout(() => {
              loadLatestData();
            }, 1e3);
          } else {
            formatAppLog("error", "at pages/index/index.vue:693", "服务器返回错误:", res);
            uni.showToast({
              title: res.message || `上传失败(${res.code || "未知错误"})`,
              icon: "none"
            });
          }
        }).catch((err) => {
          uni.hideLoading();
          formatAppLog("error", "at pages/index/index.vue:702", "上传失败详情:", err);
          let errormessage = err.message || "上传失败，请稍后再试";
          uni.showModal({
            title: "上传失败",
            content: errormessage + "\n是否重新尝试？",
            showCancel: true,
            cancelText: "取消",
            confirmText: "重试",
            success: (res) => {
              if (res.confirm) {
                uploadFile2(filePath);
              } else {
                uni.showToast({
                  title: "已取消上传",
                  icon: "none"
                });
              }
            }
          });
        }).finally(() => {
          uploading.value = false;
        });
      };
      vue.onUnmounted(() => {
        if (probabilityTimer)
          clearTimeout(probabilityTimer);
      });
      const __returned__ = { date: date2, current, show, checkRedBoxValue, checkBlueBoxValue, submitting, winningProbability, calculating, latestData, loadingLatestData, aiLoading, uploading, list, minDate, cpForm, redBallArr, blueBallArr, rest, selectDate, redBoxChange, blueBoxChange, get probabilityTimer() {
        return probabilityTimer;
      }, set probabilityTimer(v) {
        probabilityTimer = v;
      }, calculateWinningProbability, changeType, aiSelectNumbers, submitNum, loadLatestData, confirmDelete, deleteData, chooseImage, refreshData, uploadFile: uploadFile2, get addLottery() {
        return addLottery;
      }, get getLotteryByUser() {
        return getLotteryByUser;
      }, get deleteLottery() {
        return deleteLottery;
      }, get generateNumbers() {
        return generateNumbers;
      }, get calculateWinProbability() {
        return calculateWinProbability;
      }, get uploadLotteryImage() {
        return uploadLotteryImage;
      }, get getUploadStatus() {
        return getUploadStatus;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted, get ssqBallRed() {
        return ssqBallRed;
      }, get ssqBallBlue() {
        return ssqBallBlue;
      }, get dltBallRed() {
        return dltBallRed;
      }, get dltBallBlue() {
        return dltBallBlue;
      }, get timeFormat() {
        return timeFormat;
      }, get primaryButtonStyle() {
        return primaryButtonStyle;
      }, get secondaryButtonStyle() {
        return secondaryButtonStyle;
      }, get dangerButtonStyle() {
        return dangerButtonStyle;
      }, get aiButtonStyle() {
        return aiButtonStyle;
      }, get smallButtonStyle() {
        return smallButtonStyle;
      }, get miniButtonStyle() {
        return miniButtonStyle;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_subsection = resolveEasycom(vue.resolveDynamicComponent("u-subsection"), __easycom_0$4);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$1);
    const _component_u_checkbox = resolveEasycom(vue.resolveDynamicComponent("u-checkbox"), __easycom_2);
    const _component_u_checkbox_group = resolveEasycom(vue.resolveDynamicComponent("u-checkbox-group"), __easycom_3$1);
    const _component_u_calendar = resolveEasycom(vue.resolveDynamicComponent("u-calendar"), __easycom_4);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "lottery-container" }, [
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "nav-header" }, [
        vue.createVNode(_component_u_subsection, {
          list: $setup.list,
          current: $setup.current,
          onChange: $setup.changeType,
          activeColor: "#1a1a1a",
          inactiveColor: "#666666",
          bgColor: "#ffffff"
        }, null, 8, ["list", "current"])
      ]),
      vue.createCommentVNode(" 主要内容区 "),
      vue.createElementVNode("view", { class: "main-content" }, [
        vue.createCommentVNode(" 选球卡片 "),
        vue.createElementVNode("view", { class: "selection-card" }, [
          vue.createCommentVNode(" AI选号按钮 "),
          vue.createElementVNode("view", { class: "ai-section" }, [
            vue.createVNode(_component_u_button, {
              type: "primary",
              onClick: $setup.aiSelectNumbers,
              loading: $setup.aiLoading,
              customStyle: $setup.aiButtonStyle
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(
                  vue.toDisplayString($setup.aiLoading ? "AI计算中..." : "🤖 AI智能选号"),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["loading", "customStyle"])
          ]),
          vue.createCommentVNode(" 红球选择区 "),
          vue.createElementVNode("view", { class: "ball-section" }, [
            vue.createElementVNode("view", { class: "section-header" }, [
              vue.createElementVNode("view", { class: "title-wrapper" }, [
                vue.createElementVNode("text", { class: "section-title" }, "红球"),
                vue.createElementVNode(
                  "text",
                  { class: "ball-count" },
                  "已选 " + vue.toDisplayString($setup.checkRedBoxValue.length) + " 个",
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "ball-grid" }, [
              vue.createVNode(_component_u_checkbox_group, {
                placement: "row",
                onChange: $setup.redBoxChange,
                modelValue: $setup.checkRedBoxValue,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.checkRedBoxValue = $event)
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.redBallArr, (item, index2) => {
                      return vue.openBlock(), vue.createBlock(_component_u_checkbox, {
                        key: index2,
                        label: item.name,
                        name: item.name,
                        customStyle: {
                          margin: "10rpx",
                          boxShadow: $setup.checkRedBoxValue.includes(item.name) ? "0 4rpx 12rpx rgba(255,77,79,0.3)" : "none",
                          transition: "all 0.3s ease"
                        },
                        labelColor: "#ff4d4f",
                        activeColor: "#ff4d4f",
                        iconColor: "#ffffff",
                        inactiveColor: "#ff4d4f",
                        size: "26",
                        shape: "circle"
                      }, null, 8, ["label", "name", "customStyle"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"])
            ])
          ]),
          vue.createCommentVNode(" 蓝球选择区 "),
          vue.createElementVNode("view", { class: "ball-section" }, [
            vue.createElementVNode("view", { class: "section-header" }, [
              vue.createElementVNode("view", { class: "title-wrapper" }, [
                vue.createElementVNode("text", { class: "section-title" }, "蓝球"),
                vue.createElementVNode(
                  "text",
                  { class: "ball-count" },
                  "已选 " + vue.toDisplayString($setup.checkBlueBoxValue.length) + " 个",
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "ball-grid" }, [
              vue.createVNode(_component_u_checkbox_group, {
                placement: "row",
                onChange: $setup.blueBoxChange,
                modelValue: $setup.checkBlueBoxValue,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.checkBlueBoxValue = $event)
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.blueBallArr, (item, index2) => {
                      return vue.openBlock(), vue.createBlock(_component_u_checkbox, {
                        key: index2,
                        label: item.name,
                        name: item.name,
                        customStyle: {
                          margin: "10rpx",
                          boxShadow: $setup.checkBlueBoxValue.includes(item.name) ? "0 4rpx 12rpx rgba(24,144,255,0.3)" : "none",
                          transition: "all 0.3s ease"
                        },
                        labelColor: "#1890ff",
                        activeColor: "#1890ff",
                        iconColor: "#ffffff",
                        inactiveColor: "#1890ff",
                        size: "26",
                        shape: "circle"
                      }, null, 8, ["label", "name", "customStyle"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"])
            ])
          ]),
          vue.createCommentVNode(" 日期选择 "),
          vue.createElementVNode("view", { class: "date-section" }, [
            vue.createVNode(_component_u_calendar, {
              show: $setup.show,
              onConfirm: $setup.selectDate,
              onClose: _cache[2] || (_cache[2] = ($event) => $setup.show = false),
              minDate: $setup.minDate,
              color: "#1a1a1a"
            }, null, 8, ["show", "minDate"]),
            vue.createElementVNode("view", {
              class: "date-picker",
              onClick: _cache[3] || (_cache[3] = ($event) => $setup.show = true)
            }, [
              vue.createElementVNode("text", { class: "date-label" }, "开奖日期"),
              vue.createElementVNode("view", { class: "date-value-wrapper" }, [
                vue.createElementVNode(
                  "text",
                  { class: "date-value" },
                  vue.toDisplayString($setup.cpForm.openTime || "请选择"),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_u_icon, {
                  name: "arrow-right",
                  color: "#666666",
                  size: "24"
                })
              ])
            ])
          ]),
          vue.createCommentVNode(" 实时选号区 "),
          $setup.cpForm.redBall || $setup.cpForm.blueBall ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "realtime-selection"
          }, [
            vue.createElementVNode("view", { class: "realtime-header" }, [
              vue.createElementVNode("text", { class: "realtime-title" }, "当前选号")
            ]),
            vue.createElementVNode("view", { class: "realtime-numbers" }, [
              $setup.cpForm.redBall && $setup.cpForm.redBall.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "realtime-group"
              }, [
                vue.createElementVNode("text", { class: "group-label" }, "红球:"),
                vue.createElementVNode("view", { class: "number-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.cpForm.redBall.split(","), (num, idx) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: idx,
                          class: "realtime-number red-number"
                        },
                        vue.toDisplayString(num),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])) : vue.createCommentVNode("v-if", true),
              $setup.cpForm.blueBall && $setup.cpForm.blueBall.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "realtime-group"
              }, [
                vue.createElementVNode("text", { class: "group-label" }, "蓝球:"),
                vue.createElementVNode("view", { class: "number-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.cpForm.blueBall.split(","), (num, idx) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: idx,
                          class: "realtime-number blue-number"
                        },
                        vue.toDisplayString(num),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createCommentVNode(" 中奖概率显示 "),
            vue.createElementVNode("view", { class: "probability-section" }, [
              vue.createElementVNode("view", { class: "probability-header" }, [
                vue.createElementVNode("text", { class: "probability-title" }, "中奖概率")
              ]),
              vue.createElementVNode("view", { class: "probability-content" }, [
                $setup.calculating ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "probability-value medium-probability"
                }, " 计算中… ")) : $setup.winningProbability !== null ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 1,
                    class: vue.normalizeClass(["probability-value", {
                      "high-probability": $setup.winningProbability > 50,
                      "medium-probability": $setup.winningProbability >= 20 && $setup.winningProbability <= 50,
                      "low-probability": $setup.winningProbability < 20
                    }])
                  },
                  vue.toDisplayString($setup.winningProbability),
                  3
                  /* TEXT, CLASS */
                )) : (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 2,
                    class: "probability-value low-probability"
                  },
                  vue.toDisplayString($setup.cpForm.type === "ssq" ? "请选6红1蓝" : "请选5红2蓝"),
                  1
                  /* TEXT */
                ))
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 提交按钮 "),
          vue.createElementVNode("view", { class: "submit-section" }, [
            vue.createElementVNode("view", { class: "button-group" }, [
              vue.createVNode(_component_u_button, {
                type: "primary",
                onClick: $setup.submitNum,
                customStyle: { ...$setup.primaryButtonStyle, flex: 1, marginRight: "20rpx" },
                loading: $setup.submitting
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" 确认选择 ")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["customStyle", "loading"]),
              vue.createVNode(_component_u_button, {
                type: "default",
                onClick: $setup.rest,
                customStyle: { ...$setup.secondaryButtonStyle, flex: 1 }
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" 重置 ")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["customStyle"])
            ])
          ]),
          vue.createCommentVNode(" 已选号码展示区域 "),
          vue.createElementVNode("view", { class: "selected-numbers-section" }, [
            vue.createElementVNode("view", { class: "section-header" }, [
              vue.createElementVNode("text", { class: "section-title" }, "已选号码"),
              vue.createElementVNode("view", { class: "header-actions" }, [
                vue.createVNode(_component_u_icon, {
                  name: "reload",
                  color: "#1890ff",
                  size: "24",
                  onClick: $setup.refreshData,
                  style: { "margin-right": "20rpx" }
                }),
                vue.createElementVNode("view", {
                  class: "upload-button",
                  onClick: $setup.chooseImage
                }, [
                  vue.createVNode(_component_u_icon, {
                    name: "camera-fill",
                    color: "#1890ff",
                    size: "24"
                  }),
                  vue.createElementVNode("text", { class: "upload-text" }, "拍照添加")
                ])
              ])
            ]),
            $setup.latestData.length ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "data-list"
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.latestData, (item, idx) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: item._id || item.id,
                    class: "data-item"
                  }, [
                    vue.createElementVNode("view", { class: "data-info" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "data-type" },
                        vue.toDisplayString(item.type === "ssq" ? "双色球" : "大乐透"),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        { class: "data-date" },
                        vue.toDisplayString(item.openTime),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "data-numbers" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "red-balls" },
                          "红: " + vue.toDisplayString(item.redBall),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "blue-balls" },
                          "蓝: " + vue.toDisplayString(item.blueBall),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "data-probability" }, [
                        vue.createTextVNode(" 中奖概率: "),
                        vue.createElementVNode(
                          "text",
                          { class: "probability-text" },
                          vue.toDisplayString(item.winChance),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "data-actions" }, [
                      vue.createVNode(_component_u_button, {
                        type: "error",
                        onClick: ($event) => $setup.confirmDelete(item),
                        customStyle: { ...$setup.miniButtonStyle, background: $setup.dangerButtonStyle.background },
                        size: "mini"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" 删除 ")
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["onClick", "customStyle"])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : $setup.loadingLatestData ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "loading-text"
            }, " 正在加载数据… ")) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "empty-text"
            }, " 今日暂无已选号码 "))
          ])
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/pages/index/index.vue"]]);
  const props = defineMixin({
    props: {
      // 绑定的值
      modelValue: {
        type: [String, Number],
        default: () => defProps.input.value
      },
      // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
      // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
      // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
      // text-文本输入键盘
      type: {
        type: String,
        default: () => defProps.input.type
      },
      // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，
      // 兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序
      fixed: {
        type: Boolean,
        default: () => defProps.input.fixed
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: () => defProps.input.disabled
      },
      // 禁用状态时的背景色
      disabledColor: {
        type: String,
        default: () => defProps.input.disabledColor
      },
      // 是否显示清除控件
      clearable: {
        type: Boolean,
        default: () => defProps.input.clearable
      },
      // 是否密码类型
      password: {
        type: Boolean,
        default: () => defProps.input.password
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: () => defProps.input.maxlength
      },
      // 	输入框为空时的占位符
      placeholder: {
        type: String,
        default: () => defProps.input.placeholder
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: () => defProps.input.placeholderClass
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: () => defProps.input.placeholderStyle
      },
      // 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效
      showWordLimit: {
        type: Boolean,
        default: () => defProps.input.showWordLimit
      },
      // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
      // https://uniapp.dcloud.io/component/input
      // https://uniapp.dcloud.io/component/textarea
      confirmType: {
        type: String,
        default: () => defProps.input.confirmType
      },
      // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
      confirmHold: {
        type: Boolean,
        default: () => defProps.input.confirmHold
      },
      // focus时，点击页面的时候不收起键盘，微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: () => defProps.input.holdKeyboard
      },
      // 自动获取焦点
      // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
      focus: {
        type: Boolean,
        default: () => defProps.input.focus
      },
      // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
      autoBlur: {
        type: Boolean,
        default: () => defProps.input.autoBlur
      },
      // 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效
      disableDefaultPadding: {
        type: Boolean,
        default: () => defProps.input.disableDefaultPadding
      },
      // 指定focus时光标的位置
      cursor: {
        type: [String, Number],
        default: () => defProps.input.cursor
      },
      // 输入框聚焦时底部与键盘的距离
      cursorSpacing: {
        type: [String, Number],
        default: () => defProps.input.cursorSpacing
      },
      // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
      selectionStart: {
        type: [String, Number],
        default: () => defProps.input.selectionStart
      },
      // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [String, Number],
        default: () => defProps.input.selectionEnd
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: () => defProps.input.adjustPosition
      },
      // 输入框内容对齐方式，可选值为：left|center|right
      inputAlign: {
        type: String,
        default: () => defProps.input.inputAlign
      },
      // 输入框字体的大小
      fontSize: {
        type: [String, Number],
        default: () => defProps.input.fontSize
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: () => defProps.input.color
      },
      // 输入框前置图标
      prefixIcon: {
        type: String,
        default: () => defProps.input.prefixIcon
      },
      // 前置图标样式，对象或字符串
      prefixIconStyle: {
        type: [String, Object],
        default: () => defProps.input.prefixIconStyle
      },
      // 输入框后置图标
      suffixIcon: {
        type: String,
        default: () => defProps.input.suffixIcon
      },
      // 后置图标样式，对象或字符串
      suffixIconStyle: {
        type: [String, Object],
        default: () => defProps.input.suffixIconStyle
      },
      // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
      border: {
        type: String,
        default: () => defProps.input.border
      },
      // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
      readonly: {
        type: Boolean,
        default: () => defProps.input.readonly
      },
      // 输入框形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: () => defProps.input.shape
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: () => defProps.input.formatter
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      }
    }
  });
  const _sfc_main$6 = {
    name: "u-input",
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        // 清除操作
        clearInput: false,
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
        firstChange: true,
        // value绑定值的变化是由内部还是外部引起的
        changeFromInner: false,
        // 过滤处理方法
        innerFormatter: (value) => value
      };
    },
    created() {
      if (this.formatter) {
        this.innerFormatter = this.formatter;
      }
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal, oldVal) {
          if (this.changeFromInner || this.innerValue === newVal) {
            this.changeFromInner = false;
            return;
          }
          this.innerValue = newVal;
          if (this.firstChange === false && this.changeFromInner === false) {
            this.valueChange(this.innerValue, true);
          } else {
            if (!this.firstChange)
              formValidate(this, "change");
          }
          this.firstChange = false;
          this.changeFromInner = false;
        }
      }
    },
    computed: {
      // 是否显示清除控件
      isShowClear() {
        const { clearable, readonly, focused, innerValue } = this;
        return !!clearable && !readonly && !!focused && innerValue !== "";
      },
      // 组件的类名
      inputClass() {
        let classes = [], { border, disabled, shape } = this;
        border === "surround" && (classes = classes.concat(["u-border", "u-input--radius"]));
        classes.push(`u-input--${shape}`);
        border === "bottom" && (classes = classes.concat([
          "u-border-bottom",
          "u-input--no-radius"
        ]));
        return classes.join(" ");
      },
      // 组件的样式
      wrapperStyle() {
        const style = {};
        if (this.disabled) {
          style.backgroundColor = this.disabledColor;
        }
        if (this.border === "none") {
          style.padding = "0";
        } else {
          style.paddingTop = "6px";
          style.paddingBottom = "6px";
          style.paddingLeft = "9px";
          style.paddingRight = "9px";
        }
        return deepMerge$1(style, addStyle(this.customStyle));
      },
      // 输入框的样式
      inputStyle() {
        const style = {
          color: this.color,
          fontSize: addUnit(this.fontSize),
          textAlign: this.inputAlign
        };
        return style;
      }
    },
    emits: ["update:modelValue", "focus", "blur", "change", "confirm", "clear", "keyboardheightchange", "nicknamereview"],
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      // 当键盘输入时，触发input事件
      onInput(e) {
        let { value = "" } = e.detail || {};
        this.innerValue = value;
        this.$nextTick(() => {
          let formatValue = this.innerFormatter(value);
          this.innerValue = formatValue;
          this.valueChange(formatValue);
        });
      },
      // 输入框失去焦点时触发
      onBlur(event) {
        this.$emit("blur", event.detail.value);
        sleep(150).then(() => {
          this.focused = false;
        });
        formValidate(this, "blur");
      },
      // 输入框聚焦时触发
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      doFocus() {
        this.$refs["input-native"].focus();
      },
      doBlur() {
        this.$refs["input-native"].blur();
      },
      // 点击完成按钮时触发
      onConfirm(event) {
        this.$emit("confirm", this.innerValue);
      },
      // 键盘高度发生变化的时候触发此事件
      // 兼容性：微信小程序2.7.0+、App 3.1.0+
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      onnicknamereview(event) {
        this.$emit("nicknamereview", event);
      },
      // 内容发生变化，进行处理
      valueChange(value, isOut = false) {
        if (this.clearInput) {
          this.innerValue = "";
          this.clearInput = false;
        }
        this.$nextTick(() => {
          if (!isOut || this.clearInput) {
            this.changeFromInner = true;
            this.$emit("change", value);
            this.$emit("update:modelValue", value);
          }
          formValidate(this, "change");
        });
      },
      // 点击清除控件
      onClear() {
        this.clearInput = true;
        this.innerValue = "";
        this.$nextTick(() => {
          this.valueChange("");
          this.$emit("clear");
        });
      },
      /**
       * 在安卓nvue上，事件无法冒泡
       * 在某些时间，我们希望监听u-from-item的点击事件，此时会导致点击u-form-item内的u-input后
       * 无法触发u-form-item的点击事件，这里通过手动调用u-form-item的方法进行触发
       */
      clickHandler() {
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-input", $options.inputClass]),
        style: vue.normalizeStyle([$options.wrapperStyle])
      },
      [
        vue.createElementVNode("view", { class: "u-input__content" }, [
          _ctx.prefixIcon || _ctx.$slots.prefix ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-input__content__prefix-icon"
          }, [
            vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
              vue.createVNode(_component_u_icon, {
                name: _ctx.prefixIcon,
                size: "18",
                customStyle: _ctx.prefixIconStyle
              }, null, 8, ["name", "customStyle"])
            ], true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "u-input__content__field-wrapper",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
          }, [
            vue.createCommentVNode(" 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时\n					为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined\n				 "),
            vue.createElementVNode("input", {
              ref: "input-native",
              class: "u-input__content__field-wrapper__field",
              style: vue.normalizeStyle([$options.inputStyle]),
              type: _ctx.type,
              focus: _ctx.focus,
              cursor: _ctx.cursor,
              value: $data.innerValue,
              "auto-blur": _ctx.autoBlur,
              disabled: _ctx.disabled || _ctx.readonly,
              maxlength: _ctx.maxlength,
              placeholder: _ctx.placeholder,
              "placeholder-style": _ctx.placeholderStyle,
              "placeholder-class": _ctx.placeholderClass,
              "confirm-type": _ctx.confirmType,
              "confirm-hold": _ctx.confirmHold,
              "hold-keyboard": _ctx.holdKeyboard,
              "cursor-spacing": _ctx.cursorSpacing,
              "adjust-position": _ctx.adjustPosition,
              "selection-end": _ctx.selectionEnd,
              "selection-start": _ctx.selectionStart,
              password: _ctx.password || _ctx.type === "password" || false,
              ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
              onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
              onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[4] || (_cache[4] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args)),
              onNicknamereview: _cache[5] || (_cache[5] = (...args) => $options.onnicknamereview && $options.onnicknamereview(...args))
            }, null, 44, ["type", "focus", "cursor", "value", "auto-blur", "disabled", "maxlength", "placeholder", "placeholder-style", "placeholder-class", "confirm-type", "confirm-hold", "hold-keyboard", "cursor-spacing", "adjust-position", "selection-end", "selection-start", "password", "ignoreCompositionEvent"])
          ]),
          $options.isShowClear ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-input__content__clear",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_u_icon, {
              name: "close",
              size: "11",
              color: "#ffffff",
              customStyle: "line-height: 12px"
            })
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.suffixIcon || _ctx.$slots.suffix ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "u-input__content__subfix-icon"
          }, [
            vue.renderSlot(_ctx.$slots, "suffix", {}, () => [
              vue.createVNode(_component_u_icon, {
                name: _ctx.suffixIcon,
                size: "18",
                customStyle: _ctx.suffixIconStyle
              }, null, 8, ["name", "customStyle"])
            ], true)
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-df79975b"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/uni_modules/uview-plus/components/u-input/u-input.vue"]]);
  const _imports_0 = "/static/1756360024.png";
  const _sfc_main$5 = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const form = vue.reactive({
        userName: "",
        password: ""
      });
      const deviceModel = vue.ref("");
      const inputStyle = {
        background: "#f8f9fa",
        borderRadius: "12px",
        padding: "16px 20px",
        border: "none",
        height: "50px"
      };
      const placeholderStyle = {
        color: "#999"
      };
      const loginButtonStyle = {
        ...primaryButtonStyle,
        marginTop: "30px",
        height: "48px"
      };
      const quickLoginButtonStyle = {
        ...secondaryButtonStyle,
        marginTop: "20px",
        height: "48px"
      };
      uni.getSystemInfo({
        success: (res) => {
          form.deviceId = res.deviceId;
          deviceModel.value = res.deviceModel;
        }
      });
      const toLogin = () => {
        loginUser(form).then((res) => {
          if (res.code == 200) {
            uni.setStorageSync("userName", res.data.user.userName);
            uni.setStorageSync("email", res.data.user.email);
            uni.setStorageSync("token", res.data.token);
            uni.showToast({
              title: "登录成功",
              icon: "success",
              duration: 2e3
            });
            setTimeout(() => {
              res.data.user.status === "0" ? uni.switchTab({ url: "/pages/mine/mine" }) : uni.switchTab({ url: "/pages/index/index" });
            }, 1500);
            return;
          }
          uni.showToast({
            title: res.msg || "登录失败",
            icon: "error",
            duration: 2e3
          });
        });
      };
      const oneRegister = () => {
        form.userName = deviceModel.value + (/* @__PURE__ */ new Date()).getTime();
        form.password = "123456";
        registerUser(form).then((res) => {
          if (res.code == 200) {
            uni.setStorageSync("userName", res.data.user.userName);
            uni.setStorageSync("email", res.data.user.email);
            uni.setStorageSync("token", res.data.token);
            uni.showToast({
              title: "注册成功",
              icon: "success",
              duration: 2e3
            });
            setTimeout(() => {
              res.data.user.status === "0" ? uni.switchTab({ url: "/pages/mine/mine" }) : uni.switchTab({ url: "/pages/index/index" });
            }, 1500);
            return;
          }
          uni.showToast({
            title: res.msg || "注册失败",
            icon: "error",
            duration: 2e3
          });
        });
      };
      const __returned__ = { form, deviceModel, inputStyle, placeholderStyle, loginButtonStyle, quickLoginButtonStyle, toLogin, oneRegister, reactive: vue.reactive, ref: vue.ref, get register() {
        return registerUser;
      }, get login() {
        return loginUser;
      }, get primaryButtonStyle() {
        return primaryButtonStyle;
      }, get secondaryButtonStyle() {
        return secondaryButtonStyle;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_1);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "login-card" }, [
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("image", {
            class: "logo",
            src: _imports_0,
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { class: "title" }, "欢迎回来"),
          vue.createElementVNode("text", { class: "subtitle" }, "请登录您的账号")
        ]),
        vue.createElementVNode("view", { class: "form-area" }, [
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.createVNode(_component_u_input, {
              modelValue: $setup.form.userName,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.userName = $event),
              placeholder: "用户名",
              customStyle: $setup.inputStyle,
              placeholderStyle: $setup.placeholderStyle,
              prefixIcon: "account",
              prefixIconStyle: "color: #909399; font-size: 20px;"
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("view", { class: "input-item" }, [
            vue.createVNode(_component_u_input, {
              modelValue: $setup.form.password,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.password = $event),
              type: "password",
              placeholder: "密码",
              customStyle: $setup.inputStyle,
              placeholderStyle: $setup.placeholderStyle,
              prefixIcon: "lock",
              prefixIconStyle: "color: #909399; font-size: 20px;"
            }, null, 8, ["modelValue"])
          ])
        ]),
        vue.createElementVNode("view", { class: "action-area" }, [
          vue.createVNode(_component_u_button, {
            type: "primary",
            customStyle: $setup.primaryButtonStyle,
            onClick: $setup.toLogin
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(" 登录 ")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["customStyle"]),
          vue.createElementVNode("view", { class: "quick-login" }, [
            vue.createElementVNode("view", { class: "divider" }, [
              vue.createElementVNode("text", { class: "divider-text" }, "快速登录")
            ]),
            vue.createVNode(_component_u_button, {
              type: "primary",
              customStyle: $setup.secondaryButtonStyle,
              onClick: $setup.oneRegister
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(" 一键登录 ")
              ]),
              _: 1
              /* STABLE */
            }, 8, ["customStyle"])
          ])
        ])
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/pages/login/login.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        latestDrawings: [],
        myRecords: [],
        loading: false,
        loadingDrawings: false,
        hasMore: true,
        page: 1,
        pageSize: 10,
        currentUser: null,
        selectMode: false,
        selectedRecords: []
      };
    },
    onLoad() {
      this.refreshData();
    },
    onShow() {
      this.currentUser = uni.getStorageSync("userName");
      this.refreshData();
    },
    methods: {
      // 刷新数据
      refreshData() {
        this.page = 1;
        this.hasMore = true;
        this.loadLatestDrawings();
        this.loadMyRecords();
      },
      // 加载最新开奖
      async loadLatestDrawings() {
        if (this.loadingDrawings)
          return;
        this.loadingDrawings = true;
        try {
          const res = await checkPrize();
          const drawings = [];
          if (res.code === 200 && res.data) {
            if (res.data.ssq) {
              drawings.push({
                type: "ssq",
                redBall: res.data.ssq.redBall || "",
                blueBall: res.data.ssq.blueBall || "",
                openTime: res.data.ssq.openTime || ""
              });
            }
            if (res.data.dlt) {
              drawings.push({
                type: "dlt",
                redBall: res.data.dlt.redBall || "",
                blueBall: res.data.dlt.blueBall || "",
                openTime: res.data.dlt.openTime || ""
              });
            }
          }
          this.latestDrawings = drawings;
        } catch (error2) {
          formatAppLog("error", "at pages/lottery/lottery.vue:170", "加载最新开奖失败:", error2);
          uni.showToast({
            title: "加载开奖信息失败",
            icon: "none"
          });
        } finally {
          this.loadingDrawings = false;
        }
      },
      // 加载我的彩票记录
      async loadMyRecords(isLoadMore = false) {
        if (this.loading)
          return;
        this.loading = true;
        const userName = uni.getStorageSync("userName");
        formatAppLog("log", "at pages/lottery/lottery.vue:187", "当前用户名:", userName);
        if (!userName) {
          formatAppLog("log", "at pages/lottery/lottery.vue:190", "未登录，清空记录");
          this.myRecords = [];
          this.loading = false;
          return;
        }
        try {
          const res = await getLotteryByUser(userName, {
            page: this.page,
            pageSize: this.pageSize
          });
          formatAppLog("log", "at pages/lottery/lottery.vue:202", "API响应:", res);
          let records = [];
          if (res.code === 200 && res.data && res.data.records) {
            records = Array.isArray(res.data.records) ? res.data.records : [];
          } else if (res.code === 200 && Array.isArray(res.data)) {
            records = res.data;
          } else if (res.code === 2e4 && res.data) {
            records = Array.isArray(res.data) ? res.data : [];
          } else {
            formatAppLog("log", "at pages/lottery/lottery.vue:213", "API响应格式异常:", res);
          }
          formatAppLog("log", "at pages/lottery/lottery.vue:216", "获取到记录数量:", records.length);
          if (isLoadMore) {
            this.myRecords = [...this.myRecords, ...records];
          } else {
            this.myRecords = records;
          }
          this.hasMore = records.length >= this.pageSize;
          if (isLoadMore)
            this.page++;
          if (records.length === 0 && !isLoadMore) {
            this.myRecords = [];
          }
        } catch (error2) {
          formatAppLog("error", "at pages/lottery/lottery.vue:234", "加载彩票记录失败:", error2);
          uni.showToast({
            title: "加载记录失败",
            icon: "none"
          });
        } finally {
          this.loading = false;
        }
      },
      // 加载更多记录
      loadMoreRecords() {
        if (this.hasMore && !this.loading) {
          this.loadMyRecords(true);
        }
      },
      // 获取状态文本
      getStatusText(status, winChance) {
        if (status === null || status === void 0 || status === "pending") {
          return winChance ? `${winChance}` : "未开奖";
        }
        const statusMap = {
          "0": "未中奖",
          "1": "一等奖",
          "2": "二等奖",
          "3": "三等奖",
          "4": "四等奖",
          "5": "五等奖",
          "6": "六等奖",
          "7": "七等奖",
          "8": "八等奖",
          "9": "九等奖"
        };
        return statusMap[status] || "未开奖";
      },
      getStatusClass(status) {
        if (status === null || status === void 0 || status === "pending") {
          return "pending";
        }
        const classMap = {
          "0": "lost",
          "1": "won",
          "2": "won",
          "3": "won",
          "4": "won",
          "5": "won",
          "6": "won",
          "7": "won",
          "8": "won",
          "9": "won"
        };
        return classMap[status] || "lost";
      },
      getRecordCardClass(status) {
        if (status === null || status === void 0 || status === "pending") {
          return "pending-record";
        }
        if (status && status !== "0") {
          return "winning-record";
        }
        return "";
      },
      // 跳转到登录页面
      toLogin() {
        uni.navigateTo({
          url: "/pages/login/login"
        });
      },
      // 多选模式相关方法
      enterSelectMode(record) {
        this.selectMode = true;
        this.toggleSelect(record);
      },
      toggleSelect(record) {
        if (!this.selectMode)
          return;
        const index2 = this.selectedRecords.indexOf(record.id);
        if (index2 > -1) {
          this.selectedRecords.splice(index2, 1);
        } else {
          this.selectedRecords.push(record.id);
        }
      },
      cancelSelect() {
        this.selectMode = false;
        this.selectedRecords = [];
      },
      shareSelected() {
        if (this.selectedRecords.length === 0) {
          uni.showToast({
            title: "请先选择要分享的记录",
            icon: "none"
          });
          return;
        }
        const selectedData = this.myRecords.filter(
          (record) => this.selectedRecords.includes(record.id)
        );
        this.shareMultipleRecords(selectedData);
      },
      // 分享多条记录
      shareMultipleRecords(records) {
        if (!records || records.length === 0)
          return;
        let shareContent = `我分享了 ${records.length} 条彩票投注记录：

`;
        records.forEach((record, index2) => {
          const lotteryType = record.type === "dlt" ? "大乐透" : "双色球";
          const status = this.getStatusText(record.status, record.winChance);
          shareContent += `${index2 + 1}. ${lotteryType} - ${record.openTime}
`;
          shareContent += `   红球: ${record.redBall}
`;
          shareContent += `   蓝球: ${record.blueBall}
`;
          shareContent += `   状态: ${status}

`;
        });
        const shareData = {
          type: "batch",
          records: records.map((r) => ({
            id: r.id,
            type: r.type,
            redBall: r.redBall,
            blueBall: r.blueBall,
            openTime: r.openTime,
            status: r.status,
            user: r.user
          }))
        };
        const SHARE_BASE_URL = "https://cpcx.netlify.app";
        const encodedData = encodeURIComponent(btoa(JSON.stringify(shareData)));
        let shareLink;
        shareLink = `${SHARE_BASE_URL}/#/pages/share/lottery?data=${encodedData}`;
        shareContent += `查看详情：${shareLink}`;
        if (uni.canIUse("shareWithSystem")) {
          uni.shareWithSystem({
            type: "text",
            summary: shareContent,
            fail() {
              uni.showToast({
                title: "分享失败",
                icon: "none"
              });
            }
          });
        } else {
          uni.share({
            provider: "weixin",
            scene: "WXSceneSession",
            type: 3,
            href: shareLink,
            title: `分享了${records.length}条彩票记录`,
            summary: shareContent.substring(0, 100) + "...",
            imageUrl: "",
            fail: function() {
              uni.showToast({
                title: "分享失败",
                icon: "none"
              });
            }
          });
        }
        this.cancelSelect();
      },
      // 分享单条记录（原方法）
      shareToWechat(record) {
        if (this.selectMode) {
          this.toggleSelect(record);
          return;
        }
        if (uni.vibrateShort) {
          uni.vibrateShort();
        }
        const shareData = {
          id: record.id,
          type: record.type,
          redBall: record.redBall,
          blueBall: record.blueBall,
          openTime: record.openTime,
          status: record.status,
          user: record.user
        };
        const encodedData = encodeURIComponent(btoa(JSON.stringify(shareData)));
        const shareLink = `https://cpcx.netlify.app/#/pages/share/lottery?data=${encodedData}`;
        const lotteryType = record.type === "dlt" ? "大乐透" : "双色球";
        const status = this.getStatusText(record.status, record.winChance);
        const shareTitle = `我的${lotteryType}投注记录`;
        const shareSummary = `开奖日期：${record.openTime} | 状态：${status}`;
        if (uni.canIUse("shareWithSystem")) {
          uni.shareWithSystem({
            type: "text",
            summary: `${shareTitle}
${shareSummary}
查看详情：${shareLink}`,
            fail() {
              uni.showToast({
                title: "分享失败",
                icon: "none"
              });
            }
          });
        } else {
          uni.share({
            provider: "weixin",
            scene: "WXSceneSession",
            type: 3,
            // 网页类型
            href: shareLink,
            title: shareTitle,
            summary: shareSummary,
            imageUrl: "",
            fail: function() {
              uni.showToast({
                title: "分享失败",
                icon: "none"
              });
            }
          });
        }
      }
    },
    computed: {
      // 计算中奖统计
      winStats() {
        const total = this.myRecords.length;
        const won = this.myRecords.filter(
          (record) => record.status && record.status != 0 && record.status !== "pending" && record.status !== null
        ).length;
        return {
          total,
          won,
          lost: total - won
        };
      }
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.page = 1;
      this.hasMore = true;
      Promise.all([
        this.loadLatestDrawings(),
        this.loadMyRecords()
      ]).finally(() => {
        uni.stopPullDownRefresh();
      });
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "lottery-container" }, [
      vue.createCommentVNode(" 最新开奖轮播 "),
      vue.createElementVNode("view", { class: "latest-drawings" }, [
        vue.createElementVNode("view", { class: "section-title" }, [
          vue.createElementVNode("text", { class: "title-text" }, "最新开奖")
        ]),
        vue.createElementVNode("swiper", {
          class: "drawings-swiper",
          "indicator-dots": false,
          autoplay: true,
          interval: 3e3,
          duration: 500
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.latestDrawings, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index2 }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["drawing-card", item.type])
                  },
                  [
                    vue.createElementVNode("view", { class: "lottery-header-card" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "lottery-name" },
                        vue.toDisplayString(item.type === "ssq" ? "双色球" : "大乐透"),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "draw-date" },
                        vue.toDisplayString(item.openTime),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "ball-container" }, [
                      vue.createElementVNode("view", { class: "red-balls" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList((item.redBall || "").split(","), (ball, idx) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "text",
                              {
                                class: "ball red",
                                key: idx
                              },
                              vue.toDisplayString(ball),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("view", { class: "blue-balls" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList((item.blueBall || "").split(","), (ball, idx) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "text",
                              {
                                class: "ball blue",
                                key: idx
                              },
                              vue.toDisplayString(ball),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 我的彩票记录 "),
      vue.createElementVNode("view", { class: "my-records" }, [
        vue.createElementVNode("view", { class: "section-title" }, [
          vue.createElementVNode("text", { class: "title-text" }, "我的投注记录"),
          vue.createElementVNode("view", { class: "section-actions" }, [
            !$data.selectMode ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "win-stats"
              },
              vue.toDisplayString($options.winStats.won) + "/" + vue.toDisplayString($options.winStats.total),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            $data.selectMode ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "select-actions"
            }, [
              vue.createElementVNode("text", {
                class: "cancel-select",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.cancelSelect && $options.cancelSelect(...args))
              }, "取消"),
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["share-selected", { disabled: $data.selectedRecords.length === 0 }]),
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.shareSelected && $options.shareSelected(...args))
                },
                "分享",
                2
                /* CLASS */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        vue.createElementVNode(
          "scroll-view",
          {
            class: "records-list",
            "scroll-y": "true",
            onScrolltolower: _cache[2] || (_cache[2] = (...args) => $options.loadMoreRecords && $options.loadMoreRecords(...args))
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.myRecords, (record, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["record-card", [$options.getRecordCardClass(record.status), { "selected": $data.selectMode && $data.selectedRecords.includes(record.id) }]]),
                  key: index2,
                  onLongpress: ($event) => $options.enterSelectMode(record),
                  onClick: ($event) => $options.toggleSelect(record)
                }, [
                  vue.createElementVNode("view", { class: "record-header" }, [
                    $data.selectMode ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "select-checkbox"
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: vue.normalizeClass(["checkbox", { "checked": $data.selectedRecords.includes(record.id) }])
                        },
                        [
                          $data.selectedRecords.includes(record.id) ? (vue.openBlock(), vue.createElementBlock("text", {
                            key: 0,
                            class: "check-icon"
                          }, "✓")) : vue.createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      )
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode("view", { class: "lottery-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "lottery-type" },
                        vue.toDisplayString(record.type === "dlt" ? "大乐透" : "双色球"),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "record-time" },
                        vue.toDisplayString(record.openTime),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass(["record-status", $options.getStatusClass(record.status)])
                      },
                      vue.toDisplayString($options.getStatusText(record.status, record.winChance)),
                      3
                      /* TEXT, CLASS */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "number-display" }, [
                    vue.createElementVNode("view", { class: "number-section" }, [
                      vue.createElementVNode("text", { class: "label" }, "红球"),
                      vue.createElementVNode("view", { class: "balls" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(record.redBall.split(","), (ball, idx) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "text",
                              {
                                class: "ball red small",
                                key: idx
                              },
                              vue.toDisplayString(ball),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "number-section" }, [
                      vue.createElementVNode("text", { class: "label" }, "蓝球"),
                      vue.createElementVNode("view", { class: "balls" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(record.blueBall.split(","), (ball, idx) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "text",
                              {
                                class: "ball blue small",
                                key: idx
                              },
                              vue.toDisplayString(ball),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "record-footer" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "user-name" },
                      vue.toDisplayString(record.user),
                      1
                      /* TEXT */
                    )
                  ])
                ], 42, ["onLongpress", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "loading-more"
            }, [
              vue.createElementVNode("view", { class: "loading-spinner" }),
              vue.createElementVNode("text", null, "正在加载更多...")
            ])) : vue.createCommentVNode("v-if", true),
            !$data.hasMore && $data.myRecords.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "no-more"
            }, [
              vue.createElementVNode("text", null, "已经到底啦~")
            ])) : vue.createCommentVNode("v-if", true),
            $data.myRecords.length === 0 && !$data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "empty-records"
            }, [
              vue.createElementVNode("view", { class: "empty-icon" }, "🎱"),
              vue.createElementVNode("text", { class: "empty-text" }, "暂无投注记录"),
              !$data.currentUser ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "empty-subtext"
              }, "请先登录账号")) : (vue.openBlock(), vue.createElementBlock("text", {
                key: 1,
                class: "empty-subtext"
              }, "开始你的第一次投注吧！")),
              !$data.currentUser ? (vue.openBlock(), vue.createBlock(_component_u_button, {
                key: 2,
                type: "primary",
                size: "small",
                onClick: $options.toLogin,
                customStyle: "margin-top: 20px;"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("去登录")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
            ])) : vue.createCommentVNode("v-if", true)
          ],
          32
          /* NEED_HYDRATION */
        )
      ])
    ]);
  }
  const PagesLotteryLottery = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-619cda96"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/pages/lottery/lottery.vue"]]);
  const _sfc_main$3 = {
    __name: "CustomModal",
    props: {
      visible: Boolean,
      title: String,
      cancelText: {
        type: String,
        default: "取消"
      },
      confirmText: {
        type: String,
        default: "确定"
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      showCancelButton: {
        type: Boolean,
        default: true
      },
      showConfirmButton: {
        type: Boolean,
        default: true
      },
      cancelButtonStyle: {
        type: Object,
        default: () => ({
          width: "100px",
          height: "40px",
          marginRight: "12px",
          borderRadius: "8px"
        })
      },
      confirmButtonStyle: {
        type: Object,
        default: () => ({
          width: "100px",
          height: "40px",
          borderRadius: "8px"
        })
      }
    },
    emits: ["update:visible", "cancel", "confirm"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props2 = __props;
      const emit = __emit;
      const handleOverlayClick = () => {
        emit("update:visible", false);
      };
      const handleCancel = () => {
        emit("cancel");
        emit("update:visible", false);
      };
      const handleConfirm = () => {
        emit("confirm");
        emit("update:visible", false);
      };
      const __returned__ = { props: props2, emit, handleOverlayClick, handleCancel, handleConfirm, ref: vue.ref, watch: vue.watch, toRefs: vue.toRefs };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$1);
    return $props.visible ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "modal-overlay",
      onClick: $setup.handleOverlayClick
    }, [
      vue.createElementVNode("view", {
        class: "modal-content",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop"]))
      }, [
        $props.title ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "modal-header"
        }, [
          vue.createElementVNode(
            "text",
            { class: "modal-title" },
            vue.toDisplayString($props.title),
            1
            /* TEXT */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "modal-body" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        $props.showFooter ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "modal-footer"
        }, [
          $props.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_u_button, {
            key: 0,
            type: "default",
            customStyle: $props.cancelButtonStyle,
            onClick: $setup.handleCancel
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(
                vue.toDisplayString($props.cancelText),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["customStyle"])) : vue.createCommentVNode("v-if", true),
          $props.showConfirmButton ? (vue.openBlock(), vue.createBlock(_component_u_button, {
            key: 1,
            type: "primary",
            customStyle: $props.confirmButtonStyle,
            onClick: $setup.handleConfirm
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(
                vue.toDisplayString($props.confirmText),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["customStyle"])) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const CustomModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-8c6fe5af"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/components/custom-modal/CustomModal.vue"]]);
  const _sfc_main$2 = {
    __name: "mine",
    setup(__props, { expose: __expose }) {
      __expose();
      const user = vue.ref({
        id: null,
        userName: uni.getStorageSync("userName"),
        email: null,
        password: null,
        phone: null,
        deviceId: null,
        status: "0"
      });
      const showLogoutModal = vue.ref(false);
      const inputStyle = {
        background: "#f8f9fa",
        borderRadius: "12px",
        padding: "16px 20px",
        height: "48px",
        marginTop: "8px"
      };
      const placeholderStyle = {
        color: "#999"
      };
      const userLogoutButtonStyle = {
        ...logoutButtonStyle,
        width: "90px",
        height: "36px",
        fontSize: "14px",
        marginTop: "0",
        marginRight: "0"
      };
      const cancelButtonStyle = {
        width: "100px",
        height: "40px",
        marginRight: "12px",
        borderRadius: "8px"
      };
      const confirmButtonStyle = {
        width: "100px",
        height: "40px",
        borderRadius: "8px"
      };
      const openLogoutModal = () => {
        showLogoutModal.value = true;
      };
      const closeLogoutModal = () => {
        showLogoutModal.value = false;
      };
      const confirmLogout = () => {
        uni.removeStorageSync("token");
        uni.removeStorageSync("userName");
        uni.removeStorageSync("email");
        uni.reLaunch({
          url: "/pages/login/login"
        });
      };
      const logout = () => {
        uni.showModal({
          title: "提示",
          content: "确定要退出登录吗？",
          success: function(res) {
            if (res.confirm) {
              uni.removeStorageSync("token");
              uni.removeStorageSync("userName");
              uni.removeStorageSync("email");
              uni.reLaunch({
                url: "/pages/login/login"
              });
            }
          }
        });
      };
      const update = () => {
        const originalUserName = uni.getStorageSync("userName");
        const originalEmail = uni.getStorageSync("email");
        if (user.value.userName === originalUserName && user.value.email === originalEmail && !user.value.password) {
          uni.showToast({
            title: "请修改信息后再保存",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        if (!user.value.userName || user.value.userName.trim() === "") {
          uni.showToast({
            title: "用户名不能为空",
            icon: "error",
            duration: 2e3
          });
          return;
        }
        if (!user.value.email || user.value.email.trim() === "") {
          uni.showToast({
            title: "邮箱不能为空",
            icon: "error",
            duration: 2e3
          });
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.value.email)) {
          uni.showToast({
            title: "请输入有效的邮箱地址",
            icon: "error",
            duration: 2e3
          });
          return;
        }
        if (user.value.userName !== originalUserName)
          ;
        const updateData = {
          id: Number(user.value.id),
          userName: user.value.userName,
          email: user.value.email
        };
        if (user.value.password && user.value.password.trim() !== "") {
          if (user.value.password.length < 6) {
            uni.showToast({
              title: "密码长度至少6位",
              icon: "error",
              duration: 2e3
            });
            return;
          }
          updateData.password = user.value.password;
        }
        uni.showLoading({
          title: "保存中..."
        });
        updateUserInfo(user.value.userName, updateData).then((res) => {
          uni.hideLoading();
          if (res.code === 200 || res.code === 2e4) {
            uni.showToast({
              title: res.message || "修改成功",
              icon: "success",
              duration: 2e3
            });
            user.value = res.data;
            uni.setStorageSync("userName", res.data.userName);
            uni.setStorageSync("email", res.data.email);
            user.value.password = null;
            setTimeout(() => {
              getUserInfo(res.data.userName).then((refreshRes) => {
                if (refreshRes.code === 200 && refreshRes.data && refreshRes.data.user) {
                  user.value = {
                    ...user.value,
                    ...refreshRes.data.user
                  };
                } else if (refreshRes.code === 2e4 && refreshRes.data) {
                  user.value = {
                    ...user.value,
                    ...refreshRes.data
                  };
                }
              }).catch((err) => {
                formatAppLog("error", "at pages/mine/mine.vue:306", "刷新用户信息失败:", err);
              });
            }, 1e3);
            return;
          }
          uni.showToast({
            title: res.message || "修改失败",
            icon: "error",
            duration: 2e3
          });
        }).catch((err) => {
          uni.hideLoading();
          formatAppLog("error", "at pages/mine/mine.vue:319", "更新用户信息失败:", err);
          uni.showToast({
            title: "网络错误，请重试",
            icon: "error",
            duration: 2e3
          });
        });
      };
      onLoad(() => {
        getUserInfo(user.value.userName).then((res) => {
          if (res.code === 200 && res.data && res.data.user) {
            user.value = {
              ...user.value,
              ...res.data.user
            };
          }
        }).catch((err) => {
          formatAppLog("error", "at pages/mine/mine.vue:337", "获取用户信息失败:", err);
        });
      });
      const __returned__ = { user, showLogoutModal, inputStyle, placeholderStyle, userLogoutButtonStyle, cancelButtonStyle, confirmButtonStyle, openLogoutModal, closeLogoutModal, confirmLogout, logout, update, reactive: vue.reactive, ref: vue.ref, get updateUserInfo() {
        return updateUserInfo;
      }, get getUserInfo() {
        return getUserInfo;
      }, get onLoad() {
        return onLoad;
      }, get primaryButtonStyle() {
        return primaryButtonStyle;
      }, get logoutButtonStyle() {
        return logoutButtonStyle;
      }, get saveButtonStyle() {
        return saveButtonStyle;
      }, CustomModal };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$1);
    const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "profile-card" }, [
        vue.createElementVNode("view", { class: "card-header" }, [
          vue.createElementVNode("view", { class: "header-content" }, [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "title" }, "个人信息"),
              vue.createElementVNode("text", { class: "subtitle" }, "更新您的个人资料")
            ]),
            vue.createVNode(_component_u_button, {
              type: "primary",
              customStyle: $setup.userLogoutButtonStyle,
              onClick: $setup.openLogoutModal,
              class: "logout-btn"
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(" 退出登录 ")
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "form-content" }, [
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, "用户名"),
            vue.createVNode(_component_u_input, {
              modelValue: $setup.user.userName,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.user.userName = $event),
              prefixIcon: "account",
              customStyle: $setup.inputStyle,
              placeholderStyle: $setup.placeholderStyle,
              border: "none"
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, "邮箱"),
            vue.createVNode(_component_u_input, {
              modelValue: $setup.user.email,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.user.email = $event),
              placeholder: "请填写邮箱",
              prefixIcon: "email",
              customStyle: $setup.inputStyle,
              placeholderStyle: $setup.placeholderStyle,
              border: "none"
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("view", { class: "input-label" }, "密码"),
            vue.createVNode(_component_u_input, {
              modelValue: $setup.user.password,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.user.password = $event),
              type: "password",
              placeholder: "请输入新密码",
              prefixIcon: "lock",
              customStyle: $setup.inputStyle,
              placeholderStyle: $setup.placeholderStyle,
              border: "none"
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("view", { class: "button-group" }, [
            vue.createVNode(_component_u_button, {
              type: "primary",
              customStyle: $setup.saveButtonStyle,
              onClick: $setup.update
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(" 保存修改 ")
              ]),
              _: 1
              /* STABLE */
            }, 8, ["customStyle"])
          ])
        ])
      ]),
      vue.createCommentVNode(" 自定义退出登录弹窗 "),
      $setup.showLogoutModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "modal-overlay",
        onClick: $setup.closeLogoutModal
      }, [
        vue.createElementVNode("view", {
          class: "modal-content",
          onClick: _cache[4] || (_cache[4] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "modal-header" }, [
            vue.createElementVNode("text", { class: "modal-title" }, "确认退出")
          ]),
          vue.createElementVNode("view", { class: "modal-body" }, [
            vue.createVNode($setup["CustomModal"], {
              modelValue: $setup.showLogoutModal,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.showLogoutModal = $event),
              title: "确认退出",
              cancelText: "取消",
              confirmText: "确定退出",
              onCancel: $setup.closeLogoutModal,
              onConfirm: $setup.confirmLogout
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("text", { class: "modal-message" }, "确定要退出登录吗？")
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"])
          ]),
          vue.createElementVNode("view", { class: "modal-footer" }, [
            vue.createVNode(_component_u_button, {
              type: "default",
              customStyle: $setup.cancelButtonStyle,
              onClick: $setup.closeLogoutModal
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(" 取消 ")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_u_button, {
              type: "primary",
              customStyle: $setup.confirmButtonStyle,
              onClick: $setup.confirmLogout
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(" 确定退出 ")
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-7c2ebfa5"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/pages/mine/mine.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        lotteryData: {
          id: "",
          type: "",
          redBall: "",
          blueBall: "",
          openTime: "",
          status: "",
          user: "",
          records: []
        },
        redBalls: [],
        blueBalls: [],
        isBatchMode: false
      };
    },
    onLoad(options) {
      if (options.data) {
        try {
          const decodedData = decodeURIComponent(options.data);
          const jsonData = JSON.parse(atob(decodedData));
          this.lotteryData = jsonData;
          this.isBatchMode = jsonData.type === "batch" && jsonData.records && jsonData.records.length > 0;
          if (!this.isBatchMode) {
            if (this.lotteryData.redBall) {
              this.redBalls = this.lotteryData.redBall.split(",");
            }
            if (this.lotteryData.blueBall) {
              this.blueBalls = this.lotteryData.blueBall.split(",");
            }
          }
          formatAppLog("log", "at pages/share/lottery.vue:118", "分享页面加载数据:", jsonData);
          formatAppLog("log", "at pages/share/lottery.vue:119", "是否为批量模式:", this.isBatchMode);
        } catch (error2) {
          formatAppLog("error", "at pages/share/lottery.vue:121", "数据解析错误:", error2);
          uni.showToast({
            title: "数据解析错误",
            icon: "none"
          });
        }
      } else {
        uni.showToast({
          title: "无效的分享链接",
          icon: "none"
        });
      }
    },
    methods: {
      // 获取状态文本
      getStatusText(status) {
        const statusMap = {
          "pending": "待开奖",
          "0": "未中奖",
          "1": "一等奖",
          "2": "二等奖",
          "3": "三等奖",
          "4": "四等奖",
          "5": "五等奖",
          "6": "六等奖",
          "7": "七等奖",
          "8": "八等奖",
          "9": "九等奖"
        };
        return statusMap[status] || "未知状态";
      },
      // 获取状态样式类
      getStatusClass(status) {
        if (status === "won" || status === "1") {
          return "won";
        } else if (status === "lost" || status === "2") {
          return "lost";
        } else {
          return "pending";
        }
      },
      // 再次分享
      shareAgain() {
        let shareTitle, shareSummary;
        if (this.isBatchMode) {
          shareTitle = `我的彩票投注记录`;
          shareSummary = `共分享了 ${this.lotteryData.records.length} 条记录`;
        } else {
          const lotteryType = this.lotteryData.type === "dlt" ? "大乐透" : "双色球";
          const status = this.getStatusText(this.lotteryData.status);
          shareTitle = `我的${lotteryType}投注记录`;
          shareSummary = `开奖日期：${this.lotteryData.openTime} | 状态：${status}`;
        }
        const shareLink = window.location.href;
        uni.setClipboardData({
          data: `${shareTitle}
${shareSummary}
查看详情：${shareLink}`,
          success: () => {
            uni.showModal({
              title: "分享提示",
              content: "链接已复制到剪贴板，请打开微信粘贴发送",
              showCancel: false
            });
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "share-container" }, [
      vue.createCommentVNode(" 批量分享模式 "),
      $data.isBatchMode ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "batch-container"
      }, [
        vue.createElementVNode("view", { class: "batch-header" }, [
          vue.createElementVNode("text", { class: "batch-title" }, "分享的彩票记录"),
          vue.createElementVNode(
            "text",
            { class: "batch-count" },
            "共 " + vue.toDisplayString($data.lotteryData.records.length) + " 条",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "batch-records" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.lotteryData.records, (record, index2) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["record-item", record.type]),
                  key: record.id
                },
                [
                  vue.createElementVNode("view", { class: "record-header" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "record-index" },
                      vue.toDisplayString(index2 + 1) + ".",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "lottery-type" },
                      vue.toDisplayString(record.type === "dlt" ? "大乐透" : "双色球"),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "record-date" },
                      vue.toDisplayString(record.openTime),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "record-balls" }, [
                    vue.createElementVNode("view", { class: "ball-group" }, [
                      vue.createElementVNode("text", { class: "ball-label" }, "红球:"),
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(record.redBall.split(","), (ball) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              class: "ball red small",
                              key: ball
                            },
                            vue.toDisplayString(ball),
                            1
                            /* TEXT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    vue.createElementVNode("view", { class: "ball-group" }, [
                      vue.createElementVNode("text", { class: "ball-label" }, "蓝球:"),
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(record.blueBall.split(","), (ball) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              class: "ball blue small",
                              key: ball
                            },
                            vue.toDisplayString(ball),
                            1
                            /* TEXT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "record-status" }, [
                    vue.createElementVNode("text", { class: "status-label" }, "状态:"),
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass(["status-value", $options.getStatusClass(record.status)])
                      },
                      vue.toDisplayString($options.getStatusText(record.status)),
                      3
                      /* TEXT, CLASS */
                    )
                  ])
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          vue.createCommentVNode(" 单条分享模式 "),
          vue.createElementVNode("view", { class: "single-container" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["lottery-card", $data.lotteryData.type])
              },
              [
                vue.createElementVNode("view", { class: "lottery-header" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "lottery-name" },
                    vue.toDisplayString($data.lotteryData.type === "ssq" ? "双色球" : "大乐透"),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "draw-date" },
                    vue.toDisplayString($data.lotteryData.openTime),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "lottery-content" }, [
                  vue.createElementVNode("view", { class: "ball-container" }, [
                    vue.createElementVNode("view", { class: "section-title" }, "红球"),
                    vue.createElementVNode("view", { class: "red-balls" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.redBalls, (ball, idx) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              class: "ball red",
                              key: idx
                            },
                            vue.toDisplayString(ball),
                            1
                            /* TEXT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "ball-container" }, [
                    vue.createElementVNode("view", { class: "section-title" }, "蓝球"),
                    vue.createElementVNode("view", { class: "blue-balls" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.blueBalls, (ball, idx) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              class: "ball blue",
                              key: idx
                            },
                            vue.toDisplayString(ball),
                            1
                            /* TEXT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])
                ]),
                vue.createElementVNode("view", { class: "lottery-status" }, [
                  vue.createElementVNode("text", { class: "status-label" }, "开奖结果:"),
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["status-value", $options.getStatusClass($data.lotteryData.status)])
                    },
                    vue.toDisplayString($options.getStatusText($data.lotteryData.status)),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ],
              2
              /* CLASS */
            )
          ])
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )),
      vue.createElementVNode("button", {
        class: "share-button",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.shareAgain && $options.shareAgain(...args))
      }, "再次分享")
    ]);
  }
  const PagesShareLottery = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-bd698277"], ["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/pages/share/lottery.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/lottery/lottery", PagesLotteryLottery);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/share/lottery", PagesShareLottery);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/10292/Documents/HBuilderProjects/cpcx/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(uviewPlus);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
