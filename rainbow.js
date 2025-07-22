let angle=0

function onFrame(){
    console.log("hello world")

    angle+=1*Math.PI
    let angle2=angle+180
    document.body.style="background-color:hsl("+ angle +"deg 100%, 50%);--rotation:"+ angle2 +"deg"

    requestAnimationFrame(onFrame)
}
onFrame()