var canvas = document.querySelector('canvas')
    ;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse={
    x: undefined,
    y: undefined
}
var maxRadius=40;
var colorArray=[
'#2C3E50',
'#E74C3C',
'#ECF0F1',
'#3498DB',
'#2980B9'
];
window.addEventListener('mousemove',
    function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    console.log(mouse);
}); //마우스 이동 인식
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
}
); //화면 자동 조정
function Circle(x, y, dx, dy, radius,minRadius) { //하나의 객체를 만든 셈이다
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius=radius;
    this.pointx=x+1;
    this.pointy=y+1;
    this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.moveTo(this.x,this.y);
        c.lineTo(this.pointx,this.pointy);
        
        c.stroke();
        c.fill();
        c.fillStyle=this.color;
    }
    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.pointx=-(this.x-mouse.x)/15+this.x;
        this.pointy=-(this.y-mouse.y)/15+this.y;
        if (this.x + this.radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        if(mouse.x-this.x<50&&mouse.x-this.x>-50&&mouse.y-this.y<50&&mouse.y-this.y>-50){
            if(this.radius<maxRadius)
            this.radius+=1;
        }
        else if(this.radius>this.minRadius){
            this.radius-=1;
        }
        this.draw();
    }
}
var circleArray = [];
function init(){
    circleArray=[];
    for (var i = 0; i < 200; i++) {
        var radius = Math.random()*3+1;
        var x = Math.random() * (innerWidth - radius*2)+radius; //시작 위치
        var y = Math.random() * (innerHeight - radius*2)+radius;
        var dx = (Math.random() - 0.5) ; //속도
        var dy = (Math.random() - 0.5) ;
        
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}
function animate() {
    requestAnimationFrame(animate); //애니메이션
    c.clearRect(0, 0, innerWidth, innerHeight); //흔적 안남도록 순간순간 초기화
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}
animate();
init();