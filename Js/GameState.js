class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }
  
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
  
      form = new Form();
      form.display();
  
      car1 = createSprite(width / 2 - 50, height - 100);
      car1.addImage("car1", car1_img);
      car1.scale = 0.07;
  
      car2 = createSprite(width / 2 + 100, height - 100);
      car2.addImage("car2", car2_img);
      car2.scale = 0.07;

     
  
      cars = [car1, car2];
    }
    handleElements() {
      form.hide();
      this.resetTitle.html("Reset Game");
      this.resetTitle.class("resetText");
      this.resetTitle.position(width / 2 + 200, 40);
  
      this.resetButton.class("resetButton");
      this.resetButton.position(width / 2 + 230, 100);
  
      this.leadeboardTitle.html("Leaderboard");
      this.leadeboardTitle.class("resetText");
      this.leadeboardTitle.position(width / 3 - 60, 40);
  
      this.leader1.class("leadersText");
      this.leader1.position(width / 3 - 50, 80);
  
      this.leader2.class("leadersText");
      this.leader2.position(width / 3 - 50, 130);
    }
  
    /*play() {
      this.handleElements();
      this.handleResetButton();
  
      Player.getPlayersInfo();
  
      if (allPlayers !== undefined || allPlayers[0]) {
        image(track, 0, -height * 5, width, height * 6);
  
        //this.showLeaderboard();
  console.log(allPlayers)
        //index of the array
        var index = 0;
        var x = allPlayers[index].positionX;
          var y = height - allPlayers[index].positionY;
  
          cars[index].position.x = x;
          cars[index].position.y = y;
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
  
            // Changing camera position in y direction
            camera.position.y = cars[index].position.y;
          }
          cars[index+1].position.x =cars[index].position.x+5;
          cars[index+1].position.y =cars[index].position.y+5;
        
        this.handlePlayerControls();
  
        drawSprites();
      }
    } */


    play() {
      this.handleElements();
      this.handleResetButton();
  
      Player.getPlayersInfo();
     
  
      if (allPlayers !== undefined) {
        image(track, 0, -height * 5, width, height * 6);
  
       
       
        //this.showLeaderboard();
  
        //index of the array
        var index = 0;
        for (var plr in allPlayers) {
          //add 1 to the index for every loop
          index = index + 1;
  
          //use data form the database to display the cars in x and y direction
          var x = allPlayers[plr].positionX;
          var y = height - allPlayers[plr].positionY;
  
          cars[index - 1].position.x = x;
          cars[index - 1].position.y = y;
  
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
  
            
  
            // Changing camera position in y direction
            camera.position.y = cars[index - 1].position.y;
          }
        }
  
        if (this.playerMoving) {
          player.positionY += 5;
          player.update();
        }
  
        // handling keyboard events
        this.handlePlayerControls();
  
        // Finshing Line
        const finshLine = height * 6 - 100;
  
        if (player.positionY > finshLine) {
          gameState = 2;
          player.rank += 1;
         
          player.update();
          
        }
  
        drawSprites();
      }
    }

    handleResetButton() {
      this.resetButton.mousePressed(() => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players: {}
        });
        window.location.reload();
      });
    }

    showLeaderboard() {
      var leader1, leader2;
      var players = Object.values(allPlayers);
      if (
        (players[0].rank === 0 && players[1].rank === 0) ||
        players[0].rank === 1
      ) {
        // &emsp;    This tag is used for displaying four spaces.
        leader1 =
          players[0].rank +
          "&emsp;" +
          players[0].name +
          "&emsp;" +
          players[0].score;
  
        leader2 =
          players[1].rank +
          "&emsp;" +
          players[1].name +
          "&emsp;" +
          players[1].score;
      }
  
      if (players[1].rank === 1) {
        leader1 =
          players[1].rank +
          "&emsp;" +
          players[1].name +
          "&emsp;" +
          players[1].score;
  
        leader2 =
          players[0].rank +
          "&emsp;" +
          players[0].name +
          "&emsp;" +
          players[0].score;
      }
  
      this.leader1.html(leader1);
      this.leader2.html(leader2);
    }
  






    handlePlayerControls() {
      if (keyIsDown(UP_ARROW)) {
        this.playerMoving = true;
        player.positionY += 10;
        player.update();
      }
  
      if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
        player.positionX -= 5;
        console.log(player.positionX)
        console.log("hi")
        player.update();
      }
  
      if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
        player.positionX += 5;
        player.update();
      }
    }



  }
