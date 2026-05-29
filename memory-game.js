//======================================
        // Game State Variables
        //======================================
        let firstPick = null;
        let secondPick = null;
        let count = 0;
        let score = 0;
        let minutes = 0;
        let seconds = 0;
        let intervalid = 0;
        let isBoardLocked = true;


        //======================================
        // DOM Elements
        //======================================
        const startbtn = document.querySelector('.start button');
        const timer = document.querySelector('.timer span');
        const countSpan = document.querySelector('.count span');
        const scoreSpan = document.querySelector('.score span');
        const box = document.querySelector('.box');
        const showMessageBox = document.querySelector(".showMessageBox");

        const trueSound = new Audio("trueSound.wav")
        const falseSound = new Audio ("falseSound.wav")
        const winSound = new Audio ("winSound.wav")

        const images = [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7tOxhCMXNYBtYPcsAT8FzehlhMvJJZdzPQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0gRWNKtq3Wao1V_xfpMWiQwqvR7UdXaw-aA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJRGyb1CjKhh8dQ8UuwKvPT4SwuVVcchW-g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJqGwG8WdgJ4KXnBXieJFAdOusb9iO4D_XKA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5RBWgtvxXD5Md46Ee3YmzY-TRx9cFHNqng&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwldMk2JajcCKn1Q0wX6CiVbsepSxUXUoRLw&s"
        ];

        const totalImages = [...images, ...images]// copyလုပ်ပြီးသွားပေါင်းပေးတာ

        console.log("Before Shuffle")
        console.log(totalImages)

        shuffleImages(totalImages)
        console.log("After Shuffle")
        console.log(totalImages)



        //==============================
        // Random position for images
        //==============================        
        function shuffleImages(imgs) {
            for (let i = imgs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [imgs[i], imgs[j]] = [imgs[j], imgs[i]]
            }
        }

        function showGameBox() {

            box.textContent = "";

            totalImages.forEach((img_src) => {
                const card = document.createElement("div");
                card.classList.add("card");

                const front = document.createElement("div");
                front.classList.add("front");

                const back = document.createElement("div");
                back.classList.add("back");

                const image = document.createElement("img");
                image.src = img_src;

                box.appendChild(card);
                card.appendChild(front);
                card.appendChild(back);
                back.appendChild(image);

                card.addEventListener("click", startGame) // ()မပါတာclickလုပ်မှသွားခေါ်မှာမလို့
            });
        }


        //=============================
        // Start Game
        //=============================
        function startGame() {
            if (isBoardLocked || this.classList.contains("active")) return;

            this.classList.toggle("active");

            // this.classList.contains("active") ==> လှန်နေပြီးသားပုံတွေကို ပြန်ပိတ်လိုမရအောင်
            // toggle ကမတူရင်ပြန်လှည့်မယ့်အခြေအနေရှိလို့
            // toggle ကရှိရင်ဖြုတ် မရှိရင်ထည့်// this ==> card 



            // const cards = document.querySelectorAll(".card") //this.classList.toggle("active") အဲ့တစ်ကြောင်းအစား
            // cards.forEach((card) => {
            //     card.addEventListener("click", ()=>{
            //         card.classList.toggle("active")
            //     })
            // })


            if (!firstPick) { // !null false ကို trueပြောင်းပေး => !true = false
                firstPick = this; // first card is stored in firstPick
                return;
            }
            console.log("firstPick", firstPick);

            secondPick = this;
            console.log("secondPick", secondPick);

            count++;
            countSpan.textContent = count;


            if (firstPick.querySelector(".back img").src === secondPick.querySelector(".back img").src) {
                score++;
                scoreSpan.textContent = score;

                trueSound.play();

                if (score === 6) {

                    winSound.play();

                    let message = "";
                    const time = `${minutes}: ${seconds < 10 ? "0" + seconds : seconds}`;

                    if (count < 7) {
                        message = `🎉 Impossible mode! I bet you can’t do better, can you? If you can, you're a memory master! Only ${count} tries and your time was ${time}!`;
                    }
                    else if (count < 10) {
                        message = `😎 Not bad! You remembered most of  them! Tries: ${count}, Time: ${time}.`;
                    }
                    else {
                        message = `🤔 Oops! Looks like you need more memory training. Tries: ${count}, Time: ${time}.`;
                    }


                    setTimeout(() => {
                        showMessageBox.textContent = message
                        box.style.display = "none";

                        startbtn.style.display = "none";

                        let restartbtn = document.createElement("button")
                        restartbtn.textContent = "Restart";
                        restartbtn.classList.add("restartbtn")
                        showMessageBox.appendChild(restartbtn)
                        restartbtn.addEventListener("click", restart)
                    }, 200);

                    clearInterval(intervalid)
                    intervalid = null;
                }


                firstPick = null;
                secondPick = null;
            } // ပုံနှစ်ပုံညီမညီစစ်ပြီး ညီရင် scoreကို 1တိုးမယ် firstနဲ့secondကိုnullပြန်ထားမယ်

            else {
                isBoardLocked = true // ပုံနှစ်ပုံကိုသွားစစ်နေချိန် ကျန်တဲ့ပုံတွေကိုနှိပ်လို့မရအောင်

                falseSound.play();

                setTimeout(() => {
                    firstPick.classList.remove("active")
                    secondPick.classList.remove("active")
                    // ပုံလေးတွေကိုကွယ်လိုက်တယ်
                    firstPick = null;
                    secondPick = null;
                    isBoardLocked = false; // ပုံတွေသွားပြန်နှိပ်လို့ရအောင်လုပ်တာ
                }, 1000);
            }
        }



        //==================================
        // Restart 
        //==================================
        function restart() {
            seconds = 0;
            minutes = 0;
            count = 0;
            score = 0;

            clearInterval(intervalid);
            intervalid = null;

            isBoardLocked = true;
            timer.textContent = "00:00";
            countSpan.textContent = "0";
            scoreSpan.textContent = "0";

            firstPick = null;
            secondPick = null;

            startbtn.textContent = "Start";
            startbtn.style.color = "rgb(6, 205, 6)";
            startbtn.style.display = "inline-block";

            showMessageBox.textContent = "";
            box.style.display = "grid";

            shuffleImages(totalImages);
            showGameBox();
        }


        //==================================
        // Time
        //==================================
        function startTimer() {
            if (!intervalid) { //!false = true
                intervalid = setInterval(() => {
                    seconds++;
                    if (seconds === 60) {
                        minutes++;
                        seconds0;
                    }
                    timer.textContent = `${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
                }, 1000);
            }
        }


        //==================================
        // Show Preview before start
        //==================================
        function previewCard() {
            const cards = document.querySelectorAll(".card") //12cards
            cards.forEach((card) => card.classList.add("active"))

            setTimeout(() => {
                cards.forEach((card) => card.classList.remove("active"))
                isBoardLocked = false;
            }, 1000);
        }

        //===================================
        // Start button 
        //===================================
        startbtn.addEventListener("click", () => {
            if (startbtn.textContent === "Start") {
                startbtn.textContent = "Stop";
                startbtn.style.color = "red";
                isBoardLocked = false;
                previewCard();
                startTimer();
            }
            else {
                restart();
            }

        })



        showGameBox();
