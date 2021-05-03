var fightOrSkip = function () {
    // ask player if they'd liek to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // COnditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip"){
        // confirm player wants to skip
        var confrimSKip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confrimSKip) {
            window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = playerInfo.money - 10;

            // return true if player wants to leave 
            return true;
            shop();
        }
        

    }
return false;
}
// fight function (now with parameter for enemy's name)
var fight = function (enemy) {
    // repeat and execute as long as the enemy-robotis alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd liek to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
        // if true, leave fight by breaking loop 
        break;
        }
        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            //leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left. ");
        }

    }

};
// Run fight logic
var startGame = function () {
    // reset player stats 
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            debugger;
            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];
            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            // use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // pass the pickedEnemy.name variable's value into the fight function, where it will assume the value of the enemy.name paramete

            fight(pickedEnemyObj);
            // if we're not at the last enemy in the array 
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask of player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // pay again 
    //startGame();
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};
//function to end the entire game 
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! you now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle. ");
    }
    // ask player if they'd like to play again 
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game 
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
var shop = function () {
    // ask player what they'd like to do 
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    // use switch to czrry out action 
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;
        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;
        case "leave":
        case "LEAVE":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try Again.");

            // call shop() again to force player to pick valid option
            shop()
            break;
    }
};
// function to generate a random number
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

// functio to set name
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }


    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player'shealth by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "AMy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: " Robo Trumble",
        attack: randomNumber(10, 14)
    }
];


//start game when the page loads
startGame();


// add start game function
// add end game function when game ends
// alert players total stats
// ask if want to play again 
//if yes start game function
// after player skips or defeats robot shop option 
//ask if want to go to shop no continue
//if yes call shop 
//in shop ask player for refill upgrade or leave
//if refill replace money for health
//if upgrade replace money for power
//if leave say goobye and exit function
//if any invalid option call shop again

