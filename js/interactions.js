function moveX(currentPos, containerWidth, iconWidth, speed, direction, delta) {
  if (currentPos >= containerWidth) {
    return 0;

  } else if (currentPos < 0) {
    return containerWidth - iconWidth;

  } else {
    // const speed = Math.random() * 4;
    return currentPos + direction * speed * (delta || 1);
  }
}

function moveY(currentPos, containerHeight, iconHeight, speed, direction, delta) {
  if (currentPos >= containerHeight + iconHeight) {
    return 0;

  } else if (currentPos < 0) {
    return containerHeight;

  } else {
    // const speed = direction * (Math.random() * 4);
    return currentPos + direction * speed * (delta || 1);
  }
}

function isBoundingBoxColliding(bbox1, bbox2) {
  let _bbox1, _bbox2;
  if (bbox1.x < bbox2.x) {
    _bbox1 = bbox1;
    _bbox2 = bbox2;
  } else {
    _bbox1 = bbox2;
    _bbox2 = bbox1
  }
  const bbox1MinX = _bbox1.x;
  const bbox1MaxX = _bbox1.x + _bbox1.width;
  const bbox2MinX = _bbox2.x;
  const bbox2MaxX = _bbox2.x + _bbox2.width;

  if (bbox1.y < bbox2.y) {
    _bbox1 = bbox1;
    _bbox2 = bbox2;
  } else {
    _bbox1 = bbox2;
    _bbox2 = bbox1
  }
  const bbox1MinY = _bbox1.y;
  const bbox1MaxY = _bbox1.y + _bbox1.height;
  const bbox2MinY = _bbox2.y;
  const bbox2MaxY = _bbox2.y + _bbox2.height;


  const isXColliding = (bbox2MinX >= bbox1MinX && bbox2MinX <= bbox1MaxX) ||
    (bbox1MaxX >= bbox2MinX && bbox1MaxX <= bbox2MaxX);
  const isYColliding = (bbox2MinY >= bbox1MinY && bbox2MinY <= bbox1MaxY) ||
    (bbox1MaxY >= bbox2MinY && bbox1MaxY <= bbox2MaxY);

  return isXColliding && isYColliding;
}

function getBinaryMatrix(app, sprite) {
  const pixels = app.renderer.extract.pixels(sprite);
  const binaryArr = [];
  const binaryMat = [];
  for (let i = 0; i < pixels.length; i += 4) {
    binaryArr.push(pixels[i] === 255 ? 0 : 1);
  }
  while (binaryArr.length) {
    binaryMat.push(binaryArr.splice(0, sprite.width));
  }

  return binaryMat;
}

function addPauseControl(app) {
  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    // fontStyle: 'italic',
    // fontWeight: 'bold',
    // stroke: '#4a1850'
  });
  const startStopToggle = new PIXI.Text('▌▌', style);
  startStopToggle._isStop = true;
  startStopToggle.interactive = true;
  startStopToggle.buttonMode = true;

  startStopToggle.on("pointerdown", function() {
    if (this._isStop) {
      this.text = "▶";
      app.ticker.stop();
      app.ticker.update();
    } else {
      this.text = "▌▌";
      app.ticker.start();
    }
    this._isStop = !this._isStop;
    window.s = startStopToggle;

  });
  app.stage.addChild(startStopToggle);
}
