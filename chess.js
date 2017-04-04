const fs = require('fs');
const chess=require('chess');
const gm = require('gm');
const Discord = require('discord.js');
const config = require('./config.json');
//const Discord = require('discord.js');





//+++++++++++++++++variables++++++++++++++++++++\\

    const client = new Discord.Client();
    var game = [];



    //pos
    var bX1,bY1,wX1,wY1;
    var typePath = './src/type2';
    //initialize position variables
    var posXB = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var posYB = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var posXW = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var posYW = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    //size of one field
    var size = 100;
    //field size
    var fieldSize = 980;
    //size of the border
    var border = 90;
    //fieldBorderSize
    var fieldBorderSize=20;
    //player
    var whitePlayer = [], blackPlayer = [], challengingPlayer = [], challengedPlayer = [], challengeGuildID = [];
    //playerOnTurn
    playerOnTurn=['white'];
    //prefix
    prefix = config.prefix;
    //chessChannel
    var chessChannel = [];
    //letterpath
    var letterPath='src/letters/letter5.png';
    //moves 
    var moves = [];
    //chessmessages 
    var chessMessages = [
        []
    ];
    //draw requests
    var drawRequests = [];
    //moves
    var moveCount = [];
    var moveMsg = [];
    //allowMsg
    var allowMsg = [];




//+++++++++++++++++functions++++++++++++++++++++\\

    function channelEqual(channel1,channel2){
        //if not null
        if(channel1!=null && channel2!=null){
            //return true if channel equal
            if(channel1.id===channel2.id)return true;
        }
        return false;
    }

    function deleteChessChannel(channel){
        channel.delete()
            .then(console.log('deleted Channel'+channel))
            .catch(console.error);
    }

    //draw blank board => several?
    function drawBoard(indexCC){
        

        //set position variables
        //set column    
        for(var i = 0; i<8; i++){
            bY1 = size*i;
            wY1 = size*i;
            //set rows
            for(var o = 0; o<4; o++){
                //move rects to right place
                if(i%2==0){
                    bX1=size+size*2*o;
                    wX1=size*2*o;
                    //console.log('even');
                }else{
                    bX1=size*2*o;
                    wX1=size+size*2*o;
                    //console.log('uneven');
                }
                //save in position variables
                posXB[i*4+o]=border+bX1;
                posYB[i*4+o]=border+bY1;

                posXW[i*4+o]=border+wX1;
                posYW[i*4+o]=border+wY1;
                //console.log('write posXB['+(i*8+o)+']='+posXB[i*4+o]+'; posYB['+(i*8+o)+']='+posYB[i*4+o]);
                //console.log('write posXW['+(i*8+o)+']='+posXW[i*4+o]+'; posYW['+(i*8+o)+']='+posYW[i*4+o]);
            }
        }

        //TODO: automatic size; create new img if missing

        //draw board and save
        gm('./board.jpg')
            //draw border
            //set border color //save #541f0e #ffffff #301107
            .fill('#301107')
            .drawRectangle(0,0,fieldSize,fieldSize)
            //draw border of field
            //set border color //save #541f0e #ffffff
            .fill('#000000')
            .drawRectangle(border-fieldBorderSize,border-fieldBorderSize,fieldSize-border+fieldBorderSize,fieldSize-border+fieldBorderSize)
            //draw black fields
            //color of rects //save #ffffff #3f2206 #282828
            .fill('#282828')
            .drawRectangle(posXB[0],posYB[0],posXB[0]+size,posYB[0]+size)
            .drawRectangle(posXB[1],posYB[1],posXB[1]+size,posYB[1]+size)
            .drawRectangle(posXB[2],posYB[2],posXB[2]+size,posYB[2]+size)
            .drawRectangle(posXB[3],posYB[3],posXB[3]+size,posYB[3]+size)
            .drawRectangle(posXB[4],posYB[4],posXB[4]+size,posYB[4]+size)
            .drawRectangle(posXB[5],posYB[5],posXB[5]+size,posYB[5]+size)
            .drawRectangle(posXB[6],posYB[6],posXB[6]+size,posYB[6]+size)
            .drawRectangle(posXB[7],posYB[7],posXB[7]+size,posYB[7]+size)
            .drawRectangle(posXB[8],posYB[8],posXB[8]+size,posYB[8]+size)
            .drawRectangle(posXB[9],posYB[9],posXB[9]+size,posYB[9]+size)
            .drawRectangle(posXB[10],posYB[10],posXB[10]+size,posYB[10]+size)
            .drawRectangle(posXB[11],posYB[11],posXB[11]+size,posYB[11]+size)
            .drawRectangle(posXB[12],posYB[12],posXB[12]+size,posYB[12]+size)
            .drawRectangle(posXB[13],posYB[13],posXB[13]+size,posYB[13]+size)
            .drawRectangle(posXB[14],posYB[14],posXB[14]+size,posYB[14]+size)
            .drawRectangle(posXB[15],posYB[15],posXB[15]+size,posYB[15]+size)
            .drawRectangle(posXB[16],posYB[16],posXB[16]+size,posYB[16]+size)
            .drawRectangle(posXB[17],posYB[17],posXB[17]+size,posYB[17]+size)
            .drawRectangle(posXB[18],posYB[18],posXB[18]+size,posYB[18]+size)
            .drawRectangle(posXB[19],posYB[19],posXB[19]+size,posYB[19]+size)
            .drawRectangle(posXB[20],posYB[20],posXB[20]+size,posYB[20]+size)
            .drawRectangle(posXB[21],posYB[21],posXB[21]+size,posYB[21]+size)
            .drawRectangle(posXB[22],posYB[22],posXB[22]+size,posYB[22]+size)
            .drawRectangle(posXB[23],posYB[23],posXB[23]+size,posYB[23]+size)
            .drawRectangle(posXB[24],posYB[24],posXB[24]+size,posYB[24]+size)
            .drawRectangle(posXB[25],posYB[25],posXB[25]+size,posYB[25]+size)
            .drawRectangle(posXB[26],posYB[26],posXB[26]+size,posYB[26]+size)
            .drawRectangle(posXB[27],posYB[27],posXB[27]+size,posYB[27]+size)
            .drawRectangle(posXB[28],posYB[28],posXB[28]+size,posYB[28]+size)
            .drawRectangle(posXB[29],posYB[29],posXB[29]+size,posYB[29]+size)
            .drawRectangle(posXB[30],posYB[30],posXB[30]+size,posYB[30]+size)
            .drawRectangle(posXB[31],posYB[31],posXB[31]+size,posYB[31]+size)
            //draw white parts
            //color of white parts //save #000000 #e5e5e5 #a1a1a8
            .fill('#e5e5e5')
            .drawRectangle(posXW[0],posYW[0],posXW[0]+size,posYW[0]+size)
            .drawRectangle(posXW[1],posYW[1],posXW[1]+size,posYW[1]+size)
            .drawRectangle(posXW[2],posYW[2],posXW[2]+size,posYW[2]+size)
            .drawRectangle(posXW[3],posYW[3],posXW[3]+size,posYW[3]+size)
            .drawRectangle(posXW[4],posYW[4],posXW[4]+size,posYW[4]+size)
            .drawRectangle(posXW[5],posYW[5],posXW[5]+size,posYW[5]+size)
            .drawRectangle(posXW[6],posYW[6],posXW[6]+size,posYW[6]+size)
            .drawRectangle(posXW[7],posYW[7],posXW[7]+size,posYW[7]+size)
            .drawRectangle(posXW[8],posYW[8],posXW[8]+size,posYW[8]+size)
            .drawRectangle(posXW[9],posYW[9],posXW[9]+size,posYW[9]+size)
            .drawRectangle(posXW[10],posYW[10],posXW[10]+size,posYW[10]+size)
            .drawRectangle(posXW[11],posYW[11],posXW[11]+size,posYW[11]+size)
            .drawRectangle(posXW[12],posYW[12],posXW[12]+size,posYW[12]+size)
            .drawRectangle(posXW[13],posYW[13],posXW[13]+size,posYW[13]+size)
            .drawRectangle(posXW[14],posYW[14],posXW[14]+size,posYW[14]+size)
            .drawRectangle(posXW[15],posYW[15],posXW[15]+size,posYW[15]+size)
            .drawRectangle(posXW[16],posYW[16],posXW[16]+size,posYW[16]+size)
            .drawRectangle(posXW[17],posYW[17],posXW[17]+size,posYW[17]+size)
            .drawRectangle(posXW[18],posYW[18],posXW[18]+size,posYW[18]+size)
            .drawRectangle(posXW[19],posYW[19],posXW[19]+size,posYW[19]+size)
            .drawRectangle(posXW[20],posYW[20],posXW[20]+size,posYW[20]+size)
            .drawRectangle(posXW[21],posYW[21],posXW[21]+size,posYW[21]+size)
            .drawRectangle(posXW[22],posYW[22],posXW[22]+size,posYW[22]+size)
            .drawRectangle(posXW[23],posYW[23],posXW[23]+size,posYW[23]+size)
            .drawRectangle(posXW[24],posYW[24],posXW[24]+size,posYW[24]+size)
            .drawRectangle(posXW[25],posYW[25],posXW[25]+size,posYW[25]+size)
            .drawRectangle(posXW[26],posYW[26],posXW[26]+size,posYW[26]+size)
            .drawRectangle(posXW[27],posYW[27],posXW[27]+size,posYW[27]+size)
            .drawRectangle(posXW[28],posYW[28],posXW[28]+size,posYW[28]+size)
            .drawRectangle(posXW[29],posYW[29],posXW[29]+size,posYW[29]+size)
            .drawRectangle(posXW[30],posYW[30],posXW[30]+size,posYW[30]+size)
            .drawRectangle(posXW[31],posYW[31],posXW[31]+size,posYW[31]+size)
            //draw letters
            .draw(['image Over '+(0)+','+(0)+' 0,0 "'+letterPath+'"'])
            //draw figures
            .draw([getDrawImage(0,indexCC)])
            .draw([getDrawImage(1,indexCC)])
            .draw([getDrawImage(2,indexCC)])
            .draw([getDrawImage(3,indexCC)])
            .draw([getDrawImage(4,indexCC)])
            .draw([getDrawImage(5,indexCC)])
            .draw([getDrawImage(6,indexCC)])
            .draw([getDrawImage(7,indexCC)])
            .draw([getDrawImage(8,indexCC)])
            .draw([getDrawImage(9,indexCC)])
            .draw([getDrawImage(10,indexCC)])
            .draw([getDrawImage(11,indexCC)])
            .draw([getDrawImage(12,indexCC)])
            .draw([getDrawImage(13,indexCC)])
            .draw([getDrawImage(14,indexCC)])
            .draw([getDrawImage(15,indexCC)])
            .draw([getDrawImage(16,indexCC)])
            .draw([getDrawImage(17,indexCC)])
            .draw([getDrawImage(18,indexCC)])
            .draw([getDrawImage(19,indexCC)])
            .draw([getDrawImage(20,indexCC)])
            .draw([getDrawImage(21,indexCC)])
            .draw([getDrawImage(22,indexCC)])
            .draw([getDrawImage(23,indexCC)])
            .draw([getDrawImage(24,indexCC)])
            .draw([getDrawImage(25,indexCC)])
            .draw([getDrawImage(26,indexCC)])
            .draw([getDrawImage(27,indexCC)])
            .draw([getDrawImage(28,indexCC)])
            .draw([getDrawImage(29,indexCC)])
            .draw([getDrawImage(30,indexCC)])
            .draw([getDrawImage(31,indexCC)])
            .draw([getDrawImage(32,indexCC)])
            .draw([getDrawImage(33,indexCC)])
            .draw([getDrawImage(34,indexCC)])
            .draw([getDrawImage(35,indexCC)])
            .draw([getDrawImage(36,indexCC)])
            .draw([getDrawImage(37,indexCC)])
            .draw([getDrawImage(38,indexCC)])
            .draw([getDrawImage(39,indexCC)])
            .draw([getDrawImage(40,indexCC)])
            .draw([getDrawImage(41,indexCC)])
            .draw([getDrawImage(42,indexCC)])
            .draw([getDrawImage(43,indexCC)])
            .draw([getDrawImage(44,indexCC)])
            .draw([getDrawImage(45,indexCC)])
            .draw([getDrawImage(46,indexCC)])
            .draw([getDrawImage(47,indexCC)])
            .draw([getDrawImage(48,indexCC)])
            .draw([getDrawImage(49,indexCC)])
            .draw([getDrawImage(50,indexCC)])
            .draw([getDrawImage(51,indexCC)])
            .draw([getDrawImage(52,indexCC)])
            .draw([getDrawImage(53,indexCC)])
            .draw([getDrawImage(54,indexCC)])
            .draw([getDrawImage(55,indexCC)])
            .draw([getDrawImage(56,indexCC)])
            .draw([getDrawImage(57,indexCC)])
            .draw([getDrawImage(58,indexCC)])
            .draw([getDrawImage(59,indexCC)])
            .draw([getDrawImage(60,indexCC)])
            .draw([getDrawImage(61,indexCC)])
            .draw([getDrawImage(62,indexCC)])
            .draw([getDrawImage(63,indexCC)])
        

            //save image as same(board.png)
            .write('./board.jpg',function(err){
                if(err) throw err;
                //if(!err) console.log('board written');
            });
        

    }

    //draw a rectangle
    function drawRect(x1,y1,x2,y2,oldImagePath,newImagePath){

        gm(oldImagePath)
            .drawRectangle(x1,y1,x2,y2)

            .write(newImagePath,function(err){
                //if(!err)console.log('drawn rect ('+x1+','+y1+','+x2+','+y2+')');
            });
    }

    //end chess game
    function endChessGame(channel,endMessage1,endMessage2){
        var iCC = getChessChannelIndex(channel);
        game[iCC]=null;
        whitePlayer[iCC]=null;
        blackPlayer[iCC]=null;
        send2ChessMessage(channel,endMessage1,endMessage2);
    }

    function getChessChannel(channel){
        if(chessChannel==null)return;
        for(var i = 0; i<chessChannel.length; i++){
            if(channel.id==chessChannel[i].id){
                console.log('return chessChannel'+i)
                return chessChannel[i];
            }
        }
        return;
    }

    function getChessChannelIndex(channel){
        //console.log(channel);
        //console.log(chessChannel);
        //console.log(chessChannel.length);
        //console.log(channel.id+' || '+chessChannel[0].id);
        if(chessChannel==null){
            console.log('there is no chessChannel');
            return;
        }
        for(var i = 0; i<chessChannel.length; i++){
            //console.log(channel.id+' || '+chessChannel[i].id);
            if(channel.id==chessChannel[i].id){
            console.log('return chessChannelIndex '+i);
                return i;
            }
        }
        console.log('the requested channel is no chessChannel');
        return;
    }

    //return string to draw an image
    function getDrawImage(number,indexCC){
        var piecePath;
        var pieceColor = '/';
        //console.log(indexCC);
        status = game[indexCC].getStatus();
        if(status.board.squares[number].piece!=null){
            pieceColor+=status.board.squares[number].piece.side.name;
            switch(status.board.squares[number].piece.type){
                case 'pawn': piecePath=pieceColor+'Pawn.png';
                    break;
                case 'knight': piecePath=pieceColor+'Knight.png';
                    break;
                case 'bishop': piecePath=pieceColor+'Bishop.png';
                    break;
                case 'rook': piecePath=pieceColor+'Rook.png';
                    break;
                case 'queen': piecePath=pieceColor+'Queen.png';
                    break;
                case 'king': piecePath=pieceColor+'King.png';
                    break;
                default: piecePath='/blank.png';
            }
        }else{
            piecePath='/blank.png';
        }
        //console.log(typePath+piecePath);
        return 'image Over '+getXByField(status.board.squares[number].file)+','+getYByField(status.board.squares[number].rank)+' 0,0 "'+typePath+piecePath;
        //return 'image Over '+getXByField(object[1])+','+getYByField(object[1])+' 0,0 "'+typePath+'/'+object[2]+object[0]+'.png"';
    }

    function getNickOrName(cMember){
        if(cMember.nickname!=null)return cMember.nickname;
        else return cMember.user.username;
    }

    function getNumberByLetter(number){
        switch(number){
            case 'a':
                return 1;
            case 'b':
                return 2;
            case 'c':
                return 3;
            case 'd':
                return 4;
            case 'e':
                return 5;
            case 'f':
                return 6;
            case 'g':
                return 7;
            case 'h':
                return 8;
            default:
                return -1;
        }
        return null;
    }

    function getRulesString(){
        return '__**COMMANDS: **__\n**'+prefix+'move** [currentField] [endField]    => *move a piece*\n**'+prefix+'update**    => *update board*\n**'+prefix+'surrender**    => *surrender*\n**'+prefix+'draw**   => *offers your opponent a draw*\n**'+prefix+'draw** [accept/deny/offer]   => *accepts/denies/offers a draw*\n**'+prefix+'player**   => *see who\'s playing*\n**'+prefix+'delete**   => *delete this channel when the game is over* \n ** ** ';
    }

    function getHelpString(){
        return '__**COMMANDS:**__\n__**in every channel:**__\n**'+prefix+'help**   => *show this menu*\n**'+prefix+'challenge** [username/nickname/id]   => *challenge a player for a chess game*\n**'+prefix+'accept**   => *accept first of outstanding challenges*\n**'+prefix+'accept** [username/nickname/id]   => *accept a specific challenge*\n**'+prefix+'deny**   => *deny all challenges*\n**'+prefix+'deny** [username/nickname/id]   => *deny a specific challenge*\n__**in chess-channel: **__\n**'+prefix+'move** [currentField] [endField]    *=> move a piece*\n**'+prefix+'update**    => update board\n**'+prefix+'surrender**    => *surrender*\n**'+prefix+'draw**   => *offers your opponent a draw*\n**'+prefix+'draw** [accept/deny/offer]   => *accepts/denies/offers a draw*\n**'+prefix+'player**   => *see who\'s playing*\n**'+prefix+'delete**   => *delete this channel when the game is over* \n ** ** ';
    }

    function getHelpString2(){
        return '**'+prefix+'help**   => *show this menu*\n**'+prefix+'challenge** [username/nickname/id]   => *challenge a player for a chess game*\n**'+prefix+'accept**   => *accept first of outstanding challenges*\n**'+prefix+'accept** [username/nickname/id]   => *accept a specific challenge*\n**'+prefix+'deny**   => *deny all challenges*\n**'+prefix+'deny** [username/nickname/id]   => *deny a specific challenge*';
    }

    function getHelpString3(){
        return  '**'+prefix+'move** [currentField] [endField]    *=> move a piece*\n**'+prefix+'update**    => update board\n**'+prefix+'surrender**    => *surrender*\n**'+prefix+'draw**   => *offers your opponent a draw*\n**'+prefix+'draw** [accept/deny/offer]   => *accepts/denies/offers a draw*\n**'+prefix+'player**   => *see who\'s playing*\n**'+prefix+'delete**   => *delete this channel when the game is over* \n ** ** ';
    }

    //return position by letter
    function getXByField(letter){
        //get letter
        
        var temp;
        //console.log('draw on '+field);
        //get value
        switch(letter){
            case 'a':
                temp = border+size*0;
                break;
            case 'b':
                temp = border+size*1;
                break;
            case 'c':
                temp = border+size*2;
                break;
            case 'd':
                temp = border+size*3;
                break;
            case 'e':
                temp = border+size*4;
                break;
            case 'f':
                temp = border+size*5;
                break;
            case 'g':
                temp = border+size*6;
                break;
            case 'h':
                temp = border+size*7;
                break;
            default:
                temp=-1;
        }
        //console.log('yPos: '+temp);
        return temp;
    }

    //return position of piece
    function getYByField(number){ 
        //border + field; because field is drawn reverted and one field lower is needed the number gets changed 
        //console.log('xPos: '+(border+ (field.slice(1)-1-7)*(-1)) )
        return border+ (number-1-7)*(-1)*size;
        //return border+ (field.slice(1)-1-7)*(-1)*size;
    }

    function isChessChannel(channel){
        if(chessChannel==null){
            console.log('there is no chessChannel');
            return false;
        }
        console.log(chessChannel.length);
        for(var i = 0; i<chessChannel.length; i++){
            if(channel.id==chessChannel[i].id){
                //console.log(channel.id+' || '+chessChannel[i].id);
                console.log(channel.id+' is chessChannel '+i);
                return true;
            }
            //if(channel==chessChannel[i]){
            //   
            //}
        }
        console.log(channel.id+' is no chessChannel');
        return false;
    }

    //move piece
    function move(oldPos,newPos,indexCC){
        
        status = game[indexCC].getStatus();
        
        for (i = 0; i < Object.keys(status.notatedMoves).length; i++) {
            key = Object.keys(status.notatedMoves)[i];
            
            //test if files fit
            if(oldPos==status.notatedMoves[key].src.file+status.notatedMoves[key].src.rank
                && newPos==status.notatedMoves[key].dest.file+status.notatedMoves[key].dest.rank){
                    console.log('move from '+oldPos+' to '+newPos+'!');
                    if(status.notatedMoves[key].src.piece.side.name==='white')playerOnTurn[indexCC]='black';
                    if(status.notatedMoves[key].src.piece.side.name==='black')playerOnTurn[indexCC]='white';
                    //move piece
                    game[indexCC].move(key);
                    //save move to message; send number if it was whites turn
                    if(playerOnTurn[indexCC]==='white'){
                        moveMsg[indexCC].edit(moveMsg[indexCC]+' '+key);
                    }else if(playerOnTurn[indexCC]==='black'){
                        moveMsg[indexCC].edit(moveMsg[indexCC]+'   '+moveCount[indexCC]+'. '+key);
                        moveCount[indexCC]=parseInt(moveCount[indexCC])+1;
                    }
                    
                    //save move
                    //moves.push(key);
                    var status=game[indexCC].getStatus();
                    //console.log(status);
                    
                    //      !move f2 f3
                    //      !move e7 e6
                    //      !move g2 g4
                    //      !move d8 h4

                    if(status.isCheckmate){
                        console.log('checkMate');
                        endChessGame(chessChannel[indexCC],'**The '+playerOnTurn[indexCC]+' player won!**','checkmate');
                    }else if(status.isRepetition){
                        console.log('repetition');
                        endChessGame(chessChannel[indexCC],'**Draw by repetition**','repetition');
                    }else if(status.isStalemate){
                        console.log('stalemate');
                        endChessGame(chessChannel[indexCC],'**Draw by stalemate**','stalemate');
                    }else if(status.isCheck){
                        console.log('check');
                        sendChessMessages(chessChannel[indexCC],'check');
                    }else{
                        console.log('nothing special');
                        sendChessMessages(chessChannel[indexCC],key);
                    }
                    
                    return true;
            }
        }
        return false;
        
    }

    //test if move fits
    function moveIsValid(channel,oldPos,newPos){
        var iCC = getChessChannelIndex(channel);
        status = game[iCC].getStatus();
        
        for (i = 0; i < Object.keys(status.notatedMoves).length; i++) {
            key = Object.keys(status.notatedMoves)[i];
            
            //test if files fit
            if(oldPos==status.notatedMoves[key].src.file+status.notatedMoves[key].src.rank
                && newPos==status.notatedMoves[key].dest.file+status.notatedMoves[key].dest.rank){
                    console.log('move '+oldPos+' to '+newPos+' is valid');
                    return true;
            }
        }
        //if no move fits
        console.log('move '+oldPos+' to '+newPos+' is not valid');
        return false;
    }

    function send2ChessMessage(channel,content1,content2){
        var iCC = getChessChannelIndex(channel);
        allowMsg[iCC]=false;
        setTimeout(function() {
            //delete messages and send new
            if(chessMessages[iCC][1]!=null && chessMessages[iCC][2]!=null){
                chessMessages[iCC][1].delete()
                .then(function(){
                    chessMessages[iCC][2].delete()
                    .then(function(){
                        
                            channel.sendMessage(content1)
                            .then(function(message){
                                //save message
                                chessMessages[iCC][1]=message;
                                    
                                
                                channel.sendMessage(content2)
                                .then(function(message){
                                    //save message
                                    chessMessages[iCC][2]=message;
                                    allowMsg[iCC]=true;
                                });
                            });
                        });
                    });
            }else{                
                channel.sendMessage(content1)
                .then(function(message){
                    //save message
                    chessMessages[iCC].push(message);
                            
                        
                    channel.sendMessage(content2)
                    .then(function(message){
                        //save message
                        chessMessages[iCC].push(message);
                        allowMsg[iCC]=true;
                            });
                        });

                    }
                },500);
        
    }

    function sendChessMessage(channel,content){
        var iCC = getChessChannelIndex(channel);
        allowMsg[iCC]=false;
        setTimeout(function() {
            //delete messages and send new
            console.log(iCC);
            if(chessMessages[iCC][2]!=null){
                chessMessages[iCC][2].delete()
                .then(function(){
                                    
                    channel.sendMessage(content)
                    .then(function(message){
                        //save message
                        chessMessages[iCC][2]=message;
                        allowMsg[iCC]=true;
                    });
                });
            }else{ 
                channel.sendMessage(content)
                .then(function(message){
                    //save message
                    chessMessages[iCC].push(message);
                    allowMsg[iCC]=true;
                });
            }
        },500);
    }

    function sendChessMessages(channel,lastMessage){
        //var currCC = getChessChannel(channel);
        var iCC = getChessChannelIndex(channel);
        allowMsg[iCC]=false;
        console.log('send messages to chessChannel'+iCC);
        //draw board
        setTimeout(function(){drawBoard(iCC);},250);
            //I know it's interesting
        setTimeout(function() {
            //delete messages and send new
            if(chessMessages[iCC][0]!=null && chessMessages[iCC][1]!=null && chessMessages[iCC][2]!=null){
                chessMessages[iCC][0].delete()
                .then(function(){
                    chessMessages[iCC][1].delete()
                    .then(function(){
                        chessMessages[iCC][2].delete()
                        .then(function(){
        
                            channel.sendFile('./board.jpg',null,'')
                            .then(function(file){
                                //save message
                                chessMessages[iCC][0]=file;
                            
                                channel.sendMessage("**It is "+playerOnTurn[iCC]+"'s turn**")
                                .then(function(message){
                                    //save message
                                    chessMessages[iCC][1]=message;
                                        
                                    
                                    channel.sendMessage(lastMessage)
                                    .then(function(message){
                                        //save message
                                        chessMessages[iCC][2]=message;
                                        allowMsg[iCC]=true;
                                    });
                                });
                            });
                        });
                    });
                });
            }else{
                console.log('create new messages for ChessChannel'+iCC);
                channel.sendFile('./board.jpg',null,'')
                .then(function(file){
                    //save message
                    chessMessages[iCC].push(file);
                    console.log('added message to '+(chessMessages[iCC].length-1));

                    channel.sendMessage("**It is "+playerOnTurn[iCC]+"'s turn**")
                    .then(function(message){
                        //save message
                        chessMessages[iCC].push(message);
                        console.log('added message to '+(chessMessages[iCC].length-1));
                            
                        channel.sendMessage(lastMessage)
                        .then(function(message){
                            //save message
                            chessMessages[iCC].push(message);
                            console.log('added message to '+(chessMessages[iCC].length-1));
                            allowMsg[iCC]=true;
                                });
                            });
                        });
                    }
                },500);
        

    }


//++++++++++++++++++events+++++++++++++++++++\\

    client.on('ready', () =>{
        console.log('bot active');
    });

    client.on('message', message =>{
    
        //delete non commands in chess channeö
        if(!message.content.startsWith(prefix) && isChessChannel(message.channel) && message.author!==client.user){
            message.delete();
        }

        //commands
        if(message.content.startsWith(prefix)){
            var command = message.content.split(' ')[0].slice(prefix.length);
            var args = message.content.split(' ').slice(1);
            console.log(command+' command used');

            //commands for not chess channels
            if(!isChessChannel(message.channel)){
                if(command==='dcc'){
                    var temp = message.channel.guild.channels.findAll('name', 'chess');
                    for(var i = 0; i<temp.length; i++){
                        temp[i].delete();
                    }
                    console.log('removed al chessChannel');
                }else if(command==='challenge'){
                    //save player involved
                    challengingPlayer.push(message.author.id);
                    challengedPlayer.push(args[0]);
                    challengeGuildID.push(message.channel.guild);
                    console.log(challengedPlayer[challengedPlayer.length-1]+' was challenged by '+challengingPlayer[challengingPlayer.length-1]);
                    message.channel.sendMessage('** *'+args[0]+ '* was challenged by *'
                        +message.member.user.username+'* **');


                    //accept all
                }else if(command==='accept' && args[0]!=null){
                    //console.log(message.author.username+'; '+challengedPlayer);
                    //check if there is a challenge pending
                    if(challengedPlayer!=null){
                        var challengeFound = false;
                        //check for match
                        for(var i = 0; i<challengedPlayer.length; i++){
                            //check if same guild
                            if(message.channel.guild==challengeGuildID[i]){
                                //check if user is challenged by specific person
                                if(args[0]==message.channel.guild.members.get(challengingPlayer[i]).nickname
                                    || args[0]==message.channel.guild.members.get(challengingPlayer[i]).user.username
                                    || args[0]==challengingPlayer[i]){

                                    console.log('is '+challengedPlayer[i]+' equal to '+message.member.nickname+'?');
                                    if(message.member.nickname==challengedPlayer[i]
                                    || message.author.username==challengedPlayer[i]
                                    || message.author.id==challengedPlayer[i]){
                                        challengeFound=true;
                                        
                                        var randBool = Math.random() >= 0.5;
                                        console.log('player agreed: '+message.member);
                                        console.log('player requested: '+message.channel.guild.members.get(challengingPlayer[i]));
                                        if(randBool){
                                            //console.log('type1');
                                            whitePlayer.push(message.channel.guild.members.get(challengingPlayer[i]));
                                            blackPlayer.push(message.member);
                                            message.channel.sendMessage('**Game1 started**');
                                            //message.channel.sendMessage('**Game'+i+' started between**  *'+whitePlayer[whitePlayer.length-1].nickname+
                                            //    '(white)* **and** *'+blackPlayer[blackPlayer.length-1].nickname+'(black)* **in the chess channel.**');
                                        }else if(!randBool){
                                            //console.log('type2');
                                            blackPlayer.push(message.channel.guild.members.get(challengingPlayer[i]));
                                            whitePlayer.push(message.member);
                                            message.channel.sendMessage('**Game2 started**');
                                            //message.channel.sendMessage('**Game'+i+' started between**  *'+whitePlayer[whitePlayer.length-1].nickname+
                                            //    '(white)* **and** *'+blackPlayer[blackPlayer.length-1].nickname+'(black)* **in the chess channel.**');
                                        }
                                        
                                        //remove request
                                        challengingPlayer.splice(i,1);
                                        challengedPlayer.splice(i,1);
                                        challengeGuildID.splice(i,1);

                                        console.log('chessChannel: '+chessChannel);
                                        //if(chessChannel!=null)chessChannel.delete();  
                                        var ccNameString='chess_';
                                        if(whitePlayer[whitePlayer.length-1].nickname!=null)ccNameString+=whitePlayer[whitePlayer.length-1].nickname;
                                        else ccNameString+=whitePlayer[whitePlayer.length-1].user.username;
                                        ccNameString+='-';
                                        if(blackPlayer[blackPlayer.length-1].nickname!=null)ccNameString+=blackPlayer[blackPlayer.length-1].nickname;
                                        else ccNameString+=blackPlayer[blackPlayer.length-1].user.username;
                                        console.log(ccNameString);
                                        message.channel.guild.createChannel('chess','text',null)
                                            .then(function(result){
                                                chessChannel.push(result);
                                                //create game
                                                //console.log('create game'+(chessChannel[chessChannel.length-1]));
                                                console.log('create game '+(chessChannel.indexOf(chessChannel[chessChannel.length-1])) );
                                                game[chessChannel.length-1] = chess.create(),
                                                    m = null,
                                                    status = null,
                                                    key = '';
                                                setTimeout(function(){
                                                    ccNameString=' *'; 
                                                    if(whitePlayer[whitePlayer.length-1].nickname!=null)ccNameString+=whitePlayer[whitePlayer.length-1].nickname;
                                                    else ccNameString+=whitePlayer[whitePlayer.length-1].user.username;
                                                    ccNameString+='*  AND  *';
                                                    if(blackPlayer[blackPlayer.length-1].nickname!=null)ccNameString+=blackPlayer[blackPlayer.length-1].nickname;
                                                    else ccNameString+=blackPlayer[blackPlayer.length-1].user.username;
                                                    console.log(ccNameString);
                                                    //initialize variables for specific game
                                                    chessMessages[chessChannel.length-1]=[];
                                                    moveCount[chessChannel.length-1]=[parseInt(1)];
                                                    playerOnTurn[chessChannel.length-1]='white';
                                                    chessChannel[chessChannel.length-1].sendMessage('__**WELCOME TO THE GAME OF '+ccNameString.toUpperCase()+'***__\n ** **\n ** **');
                                                    chessChannel[chessChannel.length-1].sendMessage(getRulesString());
                                                    chessChannel[chessChannel.length-1].sendMessage('__**MOVES:**__\n** **')
                                                    .then(function(message){
                                                        moveMsg[chessChannel.length-1]=message;
                                                    });
                                                    chessChannel[chessChannel.length-1].sendMessage('** **\n__**BOARD**__');
                                                    sendChessMessages((chessChannel[chessChannel.length-1]),'Game started');
                                                    
                                                },500);
                                            });
                                        
                                    }           
                                }
                                break;
                            }
                            
                        }
                        if(!challengeFound)message.reply(' you are not challenged by *'+args[0]+'*');
                    }else{
                        message.reply(' you are not challenged');
                    }
                    
                    
                }else if(command==='accept'){
                    //console.log(message.author.username+'; '+challengedPlayer);
                    //check if there is a challenge pending
                    if(challengedPlayer!=null){
                        var challengeFound = false;
                        //check for match
                        for(var i = 0; i<challengedPlayer.length; i++){
                            //check if same guild
                            if(message.channel.guild==challengeGuildID[i]){
                                console.log('is '+challengedPlayer[i]+' equal to '+message.member.nickname+'?');
                                if(message.member.nickname==challengedPlayer[i]
                                || message.author.username==challengedPlayer[i]
                                || message.author.id==challengedPlayer[i]){
                                    challengeFound=true;

                                    var randBool = Math.random() >= 0.5;
                                    console.log('player agreed: '+message.member);
                                    console.log('player requested: '+message.channel.guild.members.get(challengingPlayer[i]));
                                    if(randBool){
                                        
                                        whitePlayer.push(message.channel.guild.members.get(challengingPlayer[i]));
                                        blackPlayer.push(message.member);
                                        message.channel.sendMessage('**Game started**');
                                        //message.channel.sendMessage('**Game'+i+' started between**  *'+whitePlayer[whitePlayer.length-1].nickname+
                                        //    '(white)* **and** *'+blackPlayer[blackPlayer.length-1].nickname+'(black)* **in the chess channel.**');
                                    }else if(!randBool){
                                        blackPlayer.push(message.channel.guild.members.get(challengingPlayer[i]));
                                        whitePlayer.push(message.member);
                                        message.channel.sendMessage('**Game started**');
                                        //message.channel.sendMessage('**Game'+i+' started between**  *'+whitePlayer[whitePlayer.length-1].nickname+
                                        //    '(white)* **and** *'+blackPlayer[blackPlayer.length-1].nickname+'(black)* **in the chess channel.**');
                                    }
                                    
                                    //remove request
                                    challengingPlayer.splice(i,1);
                                    challengedPlayer.splice(i,1);
                                    challengeGuildID.splice(i,1);

                                    //console.log('chessChannel: '+chessChannel);
                                    //if(chessChannel!=null)chessChannel.delete();
                                    var ccNameString='chess_';
                                    if(whitePlayer[whitePlayer.length-1].nickname!=null)ccNameString+=whitePlayer[whitePlayer.length-1].nickname;
                                    else ccNameString+=whitePlayer[whitePlayer.length-1].user.username;
                                    ccNameString+='-';
                                    if(blackPlayer[blackPlayer.length-1].nickname!=null)ccNameString+=blackPlayer[blackPlayer.length-1].nickname;
                                    else ccNameString+=blackPlayer[blackPlayer.length-1].user.username;
                                    console.log(ccNameString);
                                    message.channel.guild.createChannel('chess','text',null)
                                    .then(function(result){
                                        chessChannel.push(result);
                                        //create game
                                        //console.log('create game'+(chessChannel[chessChannel.length-1]));
                                        console.log('create game '+(chessChannel.indexOf(chessChannel[chessChannel.length-1])) );
                                        game[chessChannel.length-1] = chess.create(),
                                            m = null,
                                            status = null,
                                            key = '';
                                        setTimeout(function(){
                                                ccNameString=' *'; 
                                                if(whitePlayer[whitePlayer.length-1].nickname!=null)ccNameString+=whitePlayer[whitePlayer.length-1].nickname;
                                                else ccNameString+=whitePlayer[whitePlayer.length-1].user.username;
                                                ccNameString+='*  AND  *';
                                                if(blackPlayer[blackPlayer.length-1].nickname!=null)ccNameString+=blackPlayer[blackPlayer.length-1].nickname;
                                                else ccNameString+=blackPlayer[blackPlayer.length-1].user.username;
                                                console.log(ccNameString);
                                                //initialize variables for specific game
                                                chessMessages[chessChannel.length-1]=[];
                                                moveCount[chessChannel.length-1]=[parseInt(1)];
                                                playerOnTurn[chessChannel.length-1]='white';
                                                //chessChannel[chessChannel.length-1].sendMessage('__**WELCOME TO THE GAME OF '+ccNameString.toUpperCase()+'***__\n ** **\n ** **');
                                                //chessChannel[chessChannel.length-1].sendMessage(getRulesString());
                                                chessChannel[chessChannel.length-1].sendEmbed({
                                                                color: 0x424242,
                                                                description: '__**WELCOME TO THE GAME OF '+ccNameString.toUpperCase()+'***__',
                                                                fields: [{
                                                                    name: '__**Commands:**__',
                                                                    value: getHelpString3(),
                                                                    inlline: false
                                                                }
                                                                
                                                                ]

                                                            });
                                            chessChannel[chessChannel.length-1].sendMessage('** **\n__**MOVES:**__\n** **')
                                                            .then(function(message){
                                                            moveMsg[chessChannel.length-1]=message;
                                                });
                                            chessChannel[chessChannel.length-1].sendMessage('** **\n__**BOARD**__');
                                            sendChessMessages((chessChannel[chessChannel.length-1]),'Game started');
                                            
                                        },500);
                                    });

                                }   
                                break; 
                            }       
                            
                        }
                        console.log(challengeFound);
                        if(!challengeFound)message.reply(' you are not challenged');
                    }else{
                        message.reply(' you are not challenged');
                    }
                    
                    
                }else if(command==='deny'){
                    
                    if(args[0]==null){

                        if(challengedPlayer!=null){
                            //check for match
                            for(var i = 0; i<challengedPlayer.length; i++){
                                console.log('is '+challengedPlayer[i]+' equal to '+message.member.nickname+'?');
                                if(message.member.nickname==challengedPlayer[i]
                                || message.author.username==challengedPlayer[i]
                                || message.author.id==challengedPlayer[i]){
                                   //message.channel.sendMessage('**'+getNickOrName(message.member)+' denied all requests**');
                                    challengedPlayer.splice(i,1);
                                    challengingPlayer.splice(i,1);
            
                                }
                            }
                            message.channel.sendMessage('**'+getNickOrName(message.member)+' denied all requests**');
                        }
                    }else{
                        for(var i = 0; i<challengedPlayer.length; i++){
                            //check if user is challenged by specific person
                            if(args[0]==message.channel.guild.members.get(challengingPlayer[i]).nickname
                                || args[0]==message.channel.guild.members.get(challengingPlayer[i]).user.username
                                || args[0]==challengingPlayer[i]){

                                console.log('is '+challengedPlayer[i]+' equal to '+message.member.nickname+'?');
                                if(message.member.nickname==challengedPlayer[i]
                                || message.author.username==challengedPlayer[i]
                                || message.author.id==challengedPlayer[i]){
                                    message.channel.sendMessage('**'+getNickOrName(message.member)+' denied request of '+args[0]+'**');
                                    challengedPlayer.splice(i,1);
                                    challengingPlayer.splice(i,1);
                                }
                            }
                        }
                    }
                }else if(command==='help'){
                    message.channel.sendEmbed({

                        color: 0x13088c,
                        description: '__COMMANDS__',
                        fields: [{
                            name: '__in every channel:__',
                            value: getHelpString2(),
                            inline: false 
                        },
                        {
                            name: '__in a chess channel:__',
                            value: getHelpString3(),
                            inlline: false
                        }
                        
                        ]

                    });
                
                }else if(command==='em'){
                    message.channel.sendEmbed({

                        color: 0x13088c,
                        description: '__COMMANDS__',
                        fields: [{
                            name: '__in every channel:__',
                            value: getHelpString2(),
                            inline: false 
                        },
                        {
                            name: '__in a chess channel:__',
                            value: getHelpString3(),
                            inlline: false
                        }
                        
                        ]

                    });
                }

            }
            //commands for chess channel
            if(isChessChannel(message.channel) && message.author!==client.user){
                var iCC = getChessChannelIndex(message.channel);
                if(allowMsg[iCC]){
                console.log('message in chessChannel '+iCC);
                //if game is running
                if(game[iCC]!=null){
                    if(command==='move'){
                        console.log('used command move');
                        
                        if((message.member===whitePlayer[iCC] && playerOnTurn[iCC]==='white')
                            ||(message.member===blackPlayer[iCC] && playerOnTurn[iCC]==='black')){
                            //move piece if possible
                            if(move(args[0],args[1],iCC)){
                                console.log('move piece');
                                //sendChessMessages(message.channel,'***Waiting for move***');
                            //if move didn't work
                            }else{
                                console.log('invalid move');
                                sendChessMessage(message.channel,'***invalid move***');
                            }
                        }else{
                            sendChessMessage(message.channel,'**It is not your turn!**')
                        }
                        //command update
                    }else if(command==='update'){
                        sendChessMessages(message.channel,'updated board');
                
                    }else if(command==='surrender'){
                        console.log('surrender');
                        if((message.member===whitePlayer[iCC])
                            ||(message.member===blackPlayer[iCC])){
                            endChessGame(message.channel,message.member.nickname+' surrendered');
                        }
                    }else if(command==='player'){
                        //send who is playing versus who on the current channel
                        sendChessMessage(message.channel,'**'+whitePlayer[getChessChannelIndex(message.channel)]+'**(white pieces) is playing versus **'+blackPlayer[getChessChannelIndex(message.channel)]+'**(black pieces)');
                    }else if(command==='draw'){
                        if(args==null || args[0]==='offer'){
                            //offer draw
                            if((message.member===whitePlayer[iCC] && playerOnTurn[iCC]==='white')
                                ||(message.member===blackPlayer[iCC] && playerOnTurn[iCC]==='black')){
                            drawRequests[iCC]=message.member;
                            sendChessMessage(message.channel, message.member+' offered a draw\nuse **'+prefix+'draw *accept*** to accept\nuse **'+prefix+'draw *deny*** or **'+prefix+'move *[currentField] [endField]*** to deny');
                            }
                            //accept draw
                        }else if(args[0]==='accept'){
                            if(message.member===whitePlayer[iCC] && drawRequests[iCC]===blackPlayer[iCC]
                                || message.member===blackPlayer[iCC] && drawRequests[iCC]===whitePlayer[iCC]){
                                endChessGame(message.channel,'**draw accepted**','draw');
                                drawRequests[iCC]=null;
                            }else{
                                sendChessMessage(message.channel, 'There is no draw offer for you');
                            }
                            //deny draw
                        }else if(args[0]==='deny'){
                            if(message.member===whitePlayer[iCC] && drawRequests[iCC]===blackPlayer[iCC]
                                || message.member===blackPlayer[iCC] && drawRequests[iCC]===whitePlayer[iCC]){
                                sendChessMessage(message.channel,'**draw denied**');
                                drawRequests[iCC]=null;
                            }else{
                                sendChessMessage(message.channel, 'There is no draw offer for you');
                            }
                        }else{
                            sendChessMessage(message.channel, '**'+prefix+'draw** [accept/deny/offer]');
                        }           
                    }else if(command==='delete'){
                        
                        //if game is over
                        if(game[iCC]==null && whitePlayer[iCC]==null && blackPlayer[iCC]==null){
                            message.channel.delete();
                        }else{
                            sendChessMessage(message.channel, 'Game is still running!');
                        }
                    }else if(command==='dg'){
                        endChessGame(chessChannel[iCC],'dwad','awaw');
                    }
                }else{
                    //send if and that game is over
                    sendChessMessage(message.channel,
                    'This game is over, use **'+prefix+'delete** to delete this channel.');
                }

                }

                message.delete();
            }

            

        }

        
                
            
        
    });


//+++++++++++++++++running++++++++++++++++++++++\\



//draw board
//drawBoard();




//login
client.login(config.token);
