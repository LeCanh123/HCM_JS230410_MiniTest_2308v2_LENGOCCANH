class Player {
   id: number;
   name: string;
   point:Number

   constructor(name: string,point:Number=0, id: number = Date.now() * Math.random(),) {
       this.id = id;
       this.name = name;
       this.point = point;
   }
}


class PlayerManager {
    players: Player[];
 
    constructor(players: Player[]) {
        this.players = players;
    }

    createPlayer(newPlayer: Player ) {
        this.players.push(newPlayer);
        localStorage.setItem("Player1",JSON.stringify(this.players))
        
    }
    getData(): Player[]{
        return this.players
    }
    deletePlayer(data:Player[]){
        this.players=data;
    localStorage.setItem("Player1",JSON.stringify(this.players))

    }
    changepoint(data:Player[]){
        this.players=data;
        localStorage.setItem("Player1",JSON.stringify(this.players))
    }
} 

let players = new PlayerManager([]);

function addNewPlayer() {
    let name = (document.getElementById("InputText")as HTMLInputElement).value;
    if(name){
        const newPlayer1 = new Player(name);
        players.createPlayer(newPlayer1);
        render();
        (document.getElementById("InputText")as HTMLInputElement).value=""
    }else{
        alert("Không được để trống nội dung")
    }

  }


  function deletePlayer(id:number){
    let players1=players.getData().filter((item)=>item.id!=id)
    players.deletePlayer(players1)
    render();
  }

  function increase(id:number){
    let players1=players.getData().map((item)=>
    {
        if(item.id==id){
            return Object.assign(item,{ point:Number(item.point)+1});
        }else{
            return item
        }
    }
    )
    players.changepoint(players1)
    render();
  }
  function decrease(id:number){
    let players1=players.getData().map((item)=>
    {
        if(item.id==id){
            return Object.assign(item,{ point:item.point!=0?Number(item.point)-1:0});
        }else{
            return item
        }
    }
    )
    players.changepoint(players1)
    render();
  }


  function render() {
    playerLength();
    let hightScore=1;
    players.getData().map((item)=>{
    if(Number(item.point)>hightScore){
        hightScore=Number(item.point)
    }
    })
    let renderPlayer = document.getElementById("RenderPlayer") as HTMLElement;
    let temp1="";
players.getData().map((item)=>{
    temp1+=`
    <div class="body-item">
                <div class="body-item1">
                    <div class="body-item1-1" onclick=deletePlayer(${item.id}) ><i class="fa-solid fa-trash-can delete1"></i></div>
                    <div class="body-item1-1"><i class="fa-solid fa-crown" style="opacity: ${item.point==hightScore?1:0.1}" ></i></div>
                </div>
    
                <div class="body-item2">
                    <div>${item.name}</div>
                </div>
    
                <div class="body-item3">
                    <button class="body-item3-1" onclick=decrease(${item.id}) style="border: none;" >-</button>
                    <div class="body-item3-2">${item.point}</div>
                    <button class="body-item3-1" onclick=increase(${item.id}) style="border: none;" >+</button>
                </div>
            </div>
    `
})
if(players.getData().length>0){
    renderPlayer.innerHTML=temp1
}else{
    renderPlayer.innerHTML="<div>Chưa Có Người Chơi</div>"
}
  }

  function playerLength(){
    let playerLength1 = document.getElementById("playerLength") as HTMLElement;
    let playerLength2 = document.getElementById("totalPoint") as HTMLElement;
    playerLength1.innerHTML=`${players.getData().length}`
    let point=0;
    players.getData().map((item)=>{
        point+=Number(item.point)
    })
    playerLength2.innerHTML=`${point}`
  }
  playerLength();

  function getLocal1 () {
    let getDataLocal=JSON.parse(localStorage.getItem("Player1") as any);
    if(getDataLocal){
        for (let i = 0; i < getDataLocal.length; i++) {
            const newNote1 = new Player(getDataLocal[i].name,getDataLocal[i].point);
            players.createPlayer(newNote1);
        }
        render();
    }

  }
  getLocal1();


  (document.getElementById("AddPlayer") as HTMLInputElement).addEventListener("click", addNewPlayer);