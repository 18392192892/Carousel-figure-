window.onload = function() {

var getDom = {

	all : document.getElementById("all"),
    buttons : document.getElementById("buttons"),
    images : document.getElementById("images"),
    image : images.getElementsByTagName("img"),
    boxLeft : document.getElementById("boxLeft"),
    boxRight : document.getElementById("boxRight"),
    arrowLeft : boxLeft.getElementsByTagName("img"),
    arrowRight : boxRight.getElementsByTagName("img"),   
    left : document.getElementById("left"),
    right : document.getElementById("right"),
    elseImage : function() {
                    var elseImage1 = document.createElement("img");
                    elseImage1.src = this.image[parseInt(this.image.length)-1].src;
                    elseImage1.className = "img";
                    this.images.insertBefore(elseImage1, this.images.firstChild);
                    var elseImage2 = document.createElement("img");
                    elseImage2.src = this.image[1].src;
                    elseImage2.className = "img";
                    this.images.appendChild(elseImage2);
                },
    addAttribute : function() {
                    for(var a = 0; a < this.image.length; a++) {
                        this.image[a].style.width = parseInt(this.image[1].style.width) + "px";
                        this.image[a].style.height = parseInt(this.image[1].style.height) + "px";                       
                    }

                    var width = parseInt(this.image[0].style.width);
                    var height = parseInt(this.image[0].style.height);

                    this.images.style.width = (width * parseInt(this.image.length)) + "px";
                    this.images.style.height = height + "px";

                    this.buttons.style.width = width + "px";
                    this.buttons.style.height = height / 9 + "px";
                    this.buttons.style.top = height + "px";

                    for(var b = 0; b < parseInt(this.image.length) - 2; b++) {
                        var button = document.createElement("div");
                        button.className = "button";
                        button.style.height = parseInt(this.buttons.style.height) + "px";
                        button.style.width = parseInt(this.buttons.style.width) / (parseInt(this.image.length) - 2) + "px";
                        this.buttons.appendChild(button);
                    }

                    this.arrowLeft[0].style.width = width / 20 + "px";
                    this.arrowLeft[0].style.height = height / 10 + "px";
                    this.arrowRight[0].style.width = width / 20 + "px";
                    this.arrowRight[0].style.height = height / 10 + "px";

                    var arrowWidth = parseInt(this.arrowLeft[0].style.width);
                    var arrowHeight = parseInt(this.arrowLeft[0].style.height);

                    this.boxLeft.style.width = arrowWidth + "px";
                    this.boxLeft.style.height = arrowHeight + "px";
                    this.boxLeft.style.top = (height - arrowHeight) / 2 + "px";
                    this.boxLeft.style.left = -arrowWidth + "px";

                    this.boxRight.style.width = arrowWidth + "px";
                    this.boxRight.style.height = arrowHeight + "px";
                    this.boxRight.style.top = (height - arrowHeight) / 2 + "px";
                    this.boxRight.style.left = width + "px";

                    this.all.style.width = width + "px";
                    this.all.style.height = height + parseInt(buttons.style.height) + "px";
    },

    button : this.buttons.getElementsByTagName("div")
};

getDom.elseImage();
getDom.addAttribute();

var goImplement = {

    getVariable : {

        time : null,
        imgWidth : parseInt(getDom.image[0].style.width),
        imgNum : parseInt(getDom.image.length),
        buttonNum : parseInt(getDom.image.length) - 2,
        movetime : parseInt(getDom.image[0].style.width) / 2,
        oncetime : 10,
        flag : 0,
        finish : 1 
    },

    beginMove : function() {
                    getDom.images.style.left = -this.getVariable.imgWidth + "px";
                    getDom.button[0].id = "on";
                },   

    main : function(x) {
                goImplement.getVariable.finish = 0;
                var moveS = parseInt(getDom.images.style.left) + x;
                var all_step = goImplement.getVariable.movetime / goImplement.getVariable.oncetime;
                var one_step = x / all_step;
                function play() {
                    if(  (x < 0 &&　moveS < parseInt(getDom.images.style.left)) || (x > 0 && moveS > parseInt(getDom.images.style.left)) ) {
                        getDom.images.style.left = parseInt(getDom.images.style.left) + one_step + "px";
                        setTimeout(arguments.callee,goImplement.getVariable.oncetime);
                    }
                    else {
                        goImplement.getVariable.finish = 1;
                        getDom.images.style.left = moveS + "px";
                        if(moveS > -goImplement.getVariable.imgWidth) {
                            getDom.images.style.left = (-goImplement.getVariable.imgWidth * (goImplement.getVariable.imgNum-2)) + "px";
                        }
            
                        if(moveS < -goImplement.getVariable.imgWidth * (goImplement.getVariable.imgNum-2)) {
                            getDom.images.style.left = -goImplement.getVariable.imgWidth + "px";
                        }
                    } 
                }
                play();
            },

    Navigation : function() {
                    for(var i = 0; i < this.getVariable.buttonNum; i++) {
                        getDom.button[i].id = '';
                    }
                    if(this.getVariable.flag == this.getVariable.buttonNum) {
                        this.getVariable.flag = 0;
                    }
                    if(this.getVariable.flag < 0) {
                        this.getVariable.flag = this.getVariable.buttonNum - 1;
                    }
                    getDom.button[this.getVariable.flag].id = 'on';
    },

    MouseOperation : function() {

                        function mousevoer() {
                            for(var j = 0; j < goImplement.getVariable.buttonNum; j++) {
                                getDom.button[j].index = j;
                                getDom.button[j].onmouseover = function() {
                                    if(this.id == 'on') {
                                        return;
                                    }
                                    var newplace = parseInt(this.index);
                                    var x = (newplace - goImplement.getVariable.flag) * (-goImplement.getVariable.imgWidth);
                                    if(goImplement.getVariable.finish == 1) {
                                        goImplement.main(x);
                                        goImplement.getVariable.flag = newplace;
                                        goImplement.Navigation();
                                    }
                                }
                            }
                        }

                        function mouseclick() {
    
                            getDom.right.onclick = function() {
                                if(goImplement.getVariable.finish == 1) {
                                    goImplement.getVariable.flag++;
                                    goImplement.main(-goImplement.getVariable.imgWidth);
                                    goImplement.Navigation();
                                }
                            }
                            getDom.left.onclick = function() {
                                if(goImplement.getVariable.finish == 1) {
                                    goImplement.getVariable.flag--;
                                    goImplement.main(goImplement.getVariable.imgWidth);
                                    goImplement.Navigation();
                                }
                            }
                        }   
                        mousevoer();
                        mouseclick();
                    },

    automaticPlay : function() {
                        this.getVariable.time = setInterval(function() {
                            getDom.right.onclick();
                        },1500);
                    },

    allMouse : function() {
                    getDom.all.onmouseover = function() {
                        clearInterval(goImplement.getVariable.time);
                        getDom.boxLeft.style.left = 0 + "px";
                        getDom.boxRight.style.left = parseInt(getDom.image[0].style.width) - parseInt(getDom.arrowRight[0].style.width) + "px";
                    }
                    getDom.all.onmouseout = function() {
                        goImplement.automaticPlay();
                        getDom.boxLeft.style.left = -parseInt(getDom.arrowLeft[0].style.width) + "px";
                        getDom.boxRight.style.left = parseInt(getDom.image[0].style.width) + "px";
                    }  
                } 
}

goImplement.beginMove();
goImplement.Navigation();
goImplement.MouseOperation();
goImplement.automaticPlay();
goImplement.allMouse();

}