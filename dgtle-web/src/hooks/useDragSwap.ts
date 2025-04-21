class Draggable {
  containerElement = null; // 拖拽容器元素
  rectList = []; // 存储容器内每个项的边界矩形信息
  isPointerDown = false; // 标记是否按下鼠标
  drag = { element: null, index: 0, firstIndex: 0 }; // 存储正在拖动的元素及其索引
  clone = { element: null, x: 0, y: 0 }; // 克隆元素，用来展示拖拽效果
  diff = { x: 0, y: 0 }; // 拖动时与上次位置的差值
  referenceElement = null; // 存储参考元素，用于插入拖动元素的位置
  lastPointerMove = { x: 0, y: 0 }; // 上一次的指针位置

  constructor(options) {
    this.containerElement = options.element; // 拖拽容器元素
    this.init();
  }

  // 初始化拖拽功能
  init() {
    this.getRectList(); // 计算每个项的边界矩形
    this.bindEventListener(); // 绑定事件监听器
  }

  // 更新每个拖拽项的矩形位置
  getRectList() {

  }

  // 处理 pointerdown 事件，开始拖动
  onPointerDown(e) {

  }

  // 处理 pointermove 事件，更新拖动位置
  onPointerMove(e) {

  }

  // 处理 pointerup 事件，完成拖动
  onPointerUp(e) {
    
  }

  // 绑定事件监听器 使用bind保持this指向当前类实例
  bindEventListener() {
 

    // 监听窗口滚动、大小变化等事件，更新矩形列表

  }
}

export default Draggable;
