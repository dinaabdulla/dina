var vShader_source='attribute vec4 a_Position; \n'+
' void main() {\n'+
'gl_Position=a_Position;\n'+
'gl_PointSize=10.0;\n'+
'}\n';

var fShader_source=' void main() {\n'+'gl_FragColor=vec4(1.0,1.0,1.0,1.0);\n'+'}\n';

 function main() {
  var canvas=document.getElementById('webgl');

    var gl=getWebGLContext(canvas);
    if(!gl)
    {
        console.log("failed to fined convas");
        return ;
    }
      if(!initShaders(gl,vShader_source,fShader_source))
      {
          console.log('failed to initalize shader');
          return;
      
        }
       //get the storage location of a_Position 
       var a_Position=gl.getAttribLocation(gl.program,'a_Position');
       if(a_Position<0){
        console.log('failed to get the storage location of a_Position ');
        return;
       }
        canvas.onmousedown=function(ev) {
          click(ev,gl,canvas,a_Position);
        }

      gl.clearColor(0.0,0.0,0.0,1.0);
    
     
  }
  var g_points=[];
  function  click(ev,gl,canvas,a_Position)
  {
        var x=ev.clientX; 
        var y=ev.clientY;   
        console.log("clientx,y",x,y)
        var rect=ev.target.getBoundingClientRect();
        console.log("left",rect.left);
        console.log("top",rect.top);
        console.log("width",canvas.width);
        console.log("height",canvas.height);
        // x=((x-rect.left)-canvas.width/2)/(canvas.width/2);
        // y=(canvas.height/2-(y-rect.top))/(canvas.height/2);
        
        var z=0;
        while(z<10){
          x=Math.random()*-1;
          y=Math.random()*-1;
          g_points.push(x);
         g_points.push(y); 
          z++;
        }
        
        
        console.log("clac x,y",x,y)
        console.log("clacg_point",g_points)
        
        gl.clear(gl.COLOR_BUFFER_BIT);
        var len=g_points.length;
        for (var i=0; i<len;i+=2){
              gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);
              gl.drawArrays(gl.POINTS,0,1);

        }
      }