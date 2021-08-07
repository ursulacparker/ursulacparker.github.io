const startButton = document.getElementById("startButton")
startButton.addEventListener("click", start)

const questionContainer = document.getElementById("questionContainer")
const questionText = document.getElementById("question")
const answerButtons = document.getElementById("answerButtons")
const explanation = document.getElementById("explanation")
const possibleAnswer = document.getElementsByClassName("possibleAnswer")
const bottom = document.getElementById("bottom")
const score = document.getElementById("score")

const endButton = document.getElementById("endButton")
endButton.addEventListener("click", endQuiz)

const nextButton = document.getElementById("nextButton")
nextButton.addEventListener("click", () => {
  currentIndex++
  next()
})

var points = 0

let currentIndex

function start() {
  console.log("started game")
  startButton.classList.add("hide")
  currentIndex = 0
  questionContainer.classList.remove("hide")
  answerButtons.classList.remove("hide")
  next()
}

function next() {
  reset()
  displayQuestion(questions[currentIndex])
}

function displayQuestion(q) {
  questionText.innerText = q.question
  bottom.classList.add("hide")
  q.answers.forEach(answer => {
    const button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    button.classList.add("possibleAnswer")

    button.addEventListener("click", setAnswer)
    answerButtons.appendChild(button)
  })
}

function reset() {
  nextButton.classList.add("hide")
  explanation.classList.add("hide")
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
  for (let a of possibleAnswer) {
    a.disabled = false
  }
}

function setAnswer(e) {
  const selected = e.target
  console.log(selected)
  let answers = questions[currentIndex].answers
  console.log(answers)

  for (let a of possibleAnswer) {
    a.disabled = true
  }

  for (let answer of answers) {
    if (answer.text == selected.innerText) {
      points += answer.points
      console.log(points)
      score.innerText = "Your Current Score: " + points

      if (answer.correct == true) {
        explanation.innerText = "Good Choice! " + questions[currentIndex].explanation
      }else {
        explanation.innerText = "Let's see... " + questions[currentIndex].explanation
      }
    }
  }

  if(questions.length > currentIndex+1) {
    explanation.classList.remove("hide")
    nextButton.classList.remove("hide")
  }else {
    explanation.classList.remove("hide")
    endButton.classList.remove("hide")
  }

  bottom.classList.remove("hide")
}

function endQuiz() {
  endButton.classList.add("hide")
  explanation.classList.add("hide")
  bottom.classList.remove("hide")
  answerButtons.classList.add("hide")

  if (points == 50) {
    questionText.innerText = "Your final score was " + points + "/50! You got a perfect score! Wow, you must be a cybersecurity pro!"
  }else if (points >= 45 && points <= 49) {
    questionText.innerText = "Your final score was " + points + "/50! You are a cybersecurity expert!"
  }else if (points >= 35 && points <= 44) {
    questionText.innerText = "Your final score was " + points + "/50! You are on your way to becoming a cybersecurity afficionato!"
  }else {
      questionText.innerText = "Your final score was " + points + "/50! You are a cybersecurity student. Keep it up!"
  }

  startButton.classList.remove("hide")
  startButton.innerHTML = "Play Again!"
  startButton.classList.remove("hide")
}

//questions obj array
const questions = [
  {
    question: "You are joining a site. The site asks you to create a secure password. Do you:",
    answers: [
      {text: "Input a password with only lowercase letters.", points: 1, correct: false},
      {text: "Input your pet's name followed by some numbers.", points: 2, correct: false},
      {text: "Input a password with capital letters, lowecase letters, numbers, and special symbols but one you use on many other sites.", points: 3, correct: false},
      {text: "A password with capital letters, lowecase letters, numbers, and special symbols, and one that is unique to this site", points: 4, correct: true}
    ],
    explanation: "There is a reason that most sites ask you to input numbers, capitalized letters, special characters, etc. It might be a bit annoying, however hackers often use brute-force algorithms to crack passwords; the longer the password is and the more character possibilities there are, the longer it would take to brute force. Similarly, hackers use wordlists (long documents filled with commonly used passwords), so choosing your pet's name or the name of a popular icon would not be the best idea. Try to go with a phrase that you can easily remember and try to customize it for each site. For example, a password like 'Ilove2eatmangosandpotatoes!amazonprime' would be practically uncrackable, and the amazon prime at the end would differentiate it from passwords on other sites."
  },

  {
    question: "The site now asks you to read their terms and conditions. Do you (be honest):",
    answers: [
      {text: "Read the terms and conditions, or at least scan it for something fishy", points: 2, correct: true},
      {text: "Get scared by the length of the document and figure you have something better to do", points: 1, correct: false}
    ],
    explanation: "Oh no! You scanned over the terms and conditions, and they agreed to sell all of your data to your bosses/teachers! Your bosses/teachers now know everything you have ever said during private chats with your friends on this site. Yikes! This is obviously an exaggeration and would never happen in real life, but data tracking and selling is a real thing. If you want to protect your data, you should always read the terms and conditions."
  },

  {
    question: "You are now signing up for another site, and you notice that the site requires you to input your credit card info to confirm your identity; they promise they will not charge you. Do you:",
    answers: [
      {text: "Figure that they need to confirm your identity somehow, so you might as well just enter the credit card. What's the worst that can happen?", points: 1, correct: false},
      {text: "Think it looks a bit shady and enter some fake numbers. They're probably not validating anyways.", points: 2, correct: false},
      {text: "Close the site right away. They would never need a credit card to confirm your identity.", points: 3, correct: true}
    ],
    explanation: "If you entered your credit card info, you would find that the next morning, your account is completely empty. But they promised. Ahh! This is called a phishing attack, which is a way for criminals to gather your information under the guise of giving you a service. If any site asks for your credit card without a legitamate money exchange, never, under any circumstances, enter your credit card info. The same goes for social security numbers, bank account info, addresses, etc; unless you are sure that the site is reputable and the information is needed for a legitamate purpose, leave the site immediately. Putting in some fake numbers may be tempting, but realistically, even if you get past the credit info stage, the site is still shady and might contain links to malware or other phishing attempts. Just leave the site."
  },

  {
    question: "You recieve an email stating that someone has been watching you and they know all of your search history. They are requesting money so that they do not leak all of your private info. Do you:",
    answers: [
      {text: "Just pay them. My information is too embarrasing!", points: 1, correct: false},
      {text: "Negotiate with the person. Maybe we can work something out.", points: 2, correct: false},
      {text: "Ignore the email. This is clearly someone trying to scam people.", points: 3, correct: false},
      {text: "Report the email and ignore it. We need to prevent other from falling for this!", points: 4, correct: true}
    ],
    explanation: "If you recieve an email like this, chances are that the person on the other end knows nothing about you at all. They probably do not have access to your webcam or your search history. Malware that can do both of these things do exist, however, but it is highly unlikely that some random person would request ransom money through your email. It is best to report these emails, as they are usually scams and there is not even a real person on the other end; the sender is just a bot that was scheduled to send this message. If you do believe that you are in real danger or being stalked by someone, however, contact the police."
  },

  {
    question: "You were just notified that you were the millionth visitor on this site! You have won $100,000! Do you:",
    answers: [
      {text: "Click, of course! I want my reward so I will follow all the steps.", points: 1, correct: false},
      {text: "Interact with the site a bit before closing it.", points: 2, correct: false},
      {text: "Close the site immediately. This is not a legitimate givaway.", points: 3, correct: true}
    ],
    explanation: "If you open a page like this, it is most likely not real. These notifications of winning something are usually displayed in the form of pop-ups, and might even try to download malware on your computer. If you follow the steps, they will ask for your information in an elaborate phishing attack. There is no money to be found here, just scams. There are legitimate givaways, however you need to somehow enter the givaway in order to qualify. Unfortunately, free money is scarce on the internet (and in general)."
  },

  {
    question: "You just recieved a message from your long-lost relative! They want to visit you, but they are very poor and cannot afford the plane ticket. Do you:",
    answers: [
      {text: "Pay they way, of course! I want to know my long-lost cousin.", points: 1, correct: false},
      {text: "Email them, but not pay for their plane ride.", points: 2, correct: false},
      {text: "Ignore the email. Actual long-lost relatives would never flat out ask for money.", points: 3, correct: true}
    ],
    explanation: "Any time that a stranger on the internet asks for money, be wary. If you decided to give money to your long-lost cousin for the plane ticket, you would find that they will never contact you again and that they are nowhere to be found. If you email them back and forth, the only thing they will do is harass you further. It's best to just ignore these emails and mark them as spam. If they ask for your bank/credit info directly, report the email as a phishing attempt."
  },

  {
    question: "Someone claiming to be a secret admirerer just messaged you. They have an attatched video of them professing their love to you as well! Do you:",
    answers: [
      {text: "Message them back and download the video, of course. I just have to know who my secret admierer is. Ooh, maybe it's my crush disguising their identity!", points: 1, correct: false},
      {text: "Be wary, but download the video anyways. It's not a jar file or a dmg so it can't be a virus. It's an MP4, so what's the worst that can happen?", points: 2, correct: false},
      {text: "Delete the message immediately. Don't touch the video.", points: 3, correct: true}
    ],
    explanation: "If you downloaded the video, you found that the only thing playing was a video that was... umm... not PG-13 to put it politely. Your computer is now frozen and every time you google how to get rid of this video, there are strange ads that pop up everywhere. Yikes! The part of malware that does does damage to your computer, also known as a payload, can be neatly hidden in any type of file. Even files like pictures or videos that seem safe can have viruses in them. People who claim to be secret admirers online are usually not legitimate. Maybe just wait for a text from your crush instead?"
  },

  {
    question: "Oh no! A site tells you that you have 39 viruses on your computer! Do you:",
    answers: [
      {text: "Feel greatful that this site is looking out for you. They even attatched an antivirus for you to use! Of course I will download it, how nice of them.", points: 1, correct: false},
      {text: "Close the site immediately. No site can read your local files, this is nefarious.", points: 2, correct: true}
    ],
    explanation: "If you downloaded the antivirus, you will find that the 'antivirus' just gave you an actual piece of malware. Now every time you google cute cat videos, there are strange ads for services you most certainly do not want. Your files do not open anymore and, oh no, now your computer has gone completely black. There goes all your important files. Oops! Any site claiming to be able to detect viruses on your local computer is a complete scam. The site might correctly tell you your operating system and even your general location! This is public information that any site can easily access using javascript or your IP address. Any time that you see notifications like these, close out of the site immediately and never download anything!"
  },

  {
    question: "A site tells you that in order to keep using the site, you need to download a specific Chrome extension. Do you:",
    answers: [
      {text: "Download the extension. It's just Chrome, its not like I'm downloading a virus.", points: 1, correct: false},
      {text: "Do not download anything unless the site and chrome extension are reputable.", points: 2, correct: true}
    ],
    explanation: "If you downloaded the extension, you found that your browser has been hijacked! Things are being downloaded without you clicking anything, and your entire browser now consists of popups. You can't even find a way to get rid of the extension as everything gets periodically frozen. Google search now wants access to your camera and microphone. Yikes! Chrome extension malware is very real and unfortunately more common than one would expect. Never download extensions that are not reputable, and there are very few sites that actually need you to download a chrome extension. You can use a tool like CRXcavator to help you check if the Chrome extension is safe."
  },

  {
    question: "You are downloading a reputable file on the internet. You find that it is using a service such as adfly. There is a large green download button in the center of the screen but the ad still has 3 seconds left. Do you:",
    answers: [
      {text: "Click the large green download button. Why else would the site put it there?", points: 1, correct: false},
      {text: "Wait for the ad to be over, then click the small download button and don't touch the large blinking ones.", points: 2, correct: true},
      {text: "Panic and leave the site. If the site has 2 download buttons, what can I trust?", points: 2, correct: false}
    ],
    explanation: "This is a tricky one. Generally when we encounter strange things on a site, we should close out of that site entirely. However, there are many reputable downloads that unfortunately have malware-filled advertisements. If you are in a situation where there are multiple download buttons, go for the least flashy-looking one, this is usually the correct one. To be sure, check the file name of your download. If the file name does not make sense for what you want to download, delete it immediately. If it has an extension that does not make sense, also delete it (for example, if you are downloading a Minecraft mod that uses the extension 'jar' but the download says 'dmg'). Needeless to say, if there are any redirects (like a redirect to 'Adobe Flash Player', for example, which is now a deprecated piece of software), do not download anything from that site. To be sure that you downlaoded something safe, put your download through a scanner like VirusTotal to ensure that there is no malware."
  },

  {
    question: "You really want to download this new videogame, but you don't really want to pay for it. You find a site that offers the game for free. Do you:",
    answers: [
      {text: "Download it. This is a perfect scenario! I get the game without having to pay the price!", points: 1, correct: false},
      {text: "Just pay for the game.", points: 2, correct: true}
    ],
    explanation: "If you downloaded the 'free' game, you find that the only game being played is a battle between malware and your computer. General PSA: pirated things are illegal. You shouldn't download them anyways. Another PSA is that when sites claim to have pirated goods, they actually usually don't. Any time a site is offering a paid item for free, just leave the site and don't download anything, no matter how tempting it may be."
  },

  {
    question: "You get a phone call where the person on the other end states that your computer has been infected with malware. But no need to worry! They are from tech support and they will help you. They just need you to download some remote access software so they can fix it. Do you:",
    answers: [
      {text: "Download the software and allow them access. I need them to help me get rid of these viruses!", points: 1, correct: false},
      {text: "Hang up the phone.", points: 2, correct: false},
      {text: "Hang up the phone and report the number to the FTC.", points: 3, correct: true}
    ],
    explanation: "If you downloaded the software and allowed the person access, you will find that they might have downloaded malware onto your computer. They will also demand payment in gift cards. You will most likely be sent across town to various Walmarts and buy $100+ worth of gift cards. There goes your day! If you recieve a phone call like this, go to reportfraud.ftc.gov and submit a report. You might not be vulnerable to this, but others, especially those with less computing knowledge or the elderly, may be!"
  },

  {
    question: "You enter a Starbucks and you want to catch up on some emails. You have a choice between joining the free starbucks wifi or creating a hotspot. Do you:",
    answers: [
      {text: "Join starbucks WiFi. It's free!", points: 1, correct: false},
      {text: "Use your own hotspot.", points: 2, correct: true}
    ],
    explanation: "If you joined the Starbucks wifi, you notice that when you go to your email, you are being redirected to Never Gonna Give You Up by Rick Astley. How? Public WiFi is inherently insecure. Hackers can intercept your traffic and redirect you to different site. They can even steal sensitive information if the site you are visiting does uses HTTP instead of HTTPS. They can also create fake versions of reputable site that seem legit, but are actually traps. When you have the option, always use a hotspot on your phone. And remember! Make the password on your hotspot secure as well, or a hacker can join your hotspot and intercept your traffic that way. If you must use public wifi for some reason, always connect with a VPN as it will give you some protection."
  },

  {
    question: "You just moved. Your router is being set up tommorow, and you want to relax with some Netflix. Because you are not getting the best service, the video keeps buffering. You try your neigbor's wifi, and their password is simply 'password'. You have the choice of using cellular or their WiFi. Do you:",
    answers: [
      {text: "Join their WiFi. It's just for a day, they'll never know.", points: 1, correct: false},
      {text: "Keep using cellular. It might be annoying, but it's the safe thing to do.", points: 2, correct: true}
    ],
    explanation: "If you joined your neigbor's wifi, you were in for an evening of entertainment. Turns out your neighbor is a seasoned hacker who set up a trap, and they decided to have some fun with you. All night long, you got redirected to various sites, and something even auto-downloaded onto your computer. You opened it out of curiosity, and now nyan cat is blaring from your speakers and a cartoon kitten is jumping around the screen, preventing you from using your computer at all. Eek! Never use someone else's WiFi, because if you are on someone else's network, you have the same risks and more as being on a public wifi network, because the person you are stealing from is on the network and also the network admin. Just use your own WiFi. Another thing to remember is that you need to make your WiFi password secure so that someone can't guess your password and attack you/your network."
  },

  {
    question: "You find that your computer is getting super hot for no reason and running super slowly. Do you:",
    answers: [
      {text: "Figure the computer is getting old. Buy a new one.", points: 1, correct: false},
      {text: "Take it in to a computer store and figure there is an issue with the CPU.", points: 2, correct: false},
      {text: "First check for malware. Certain malware can show symptoms like this.", points: 3, correct: true}
    ],
    explanation: "Not all malware is blatent. Unlike adware that causes many popups on your computer, certain types of malware like crypto-malware (malware that uses your computer to unknowingly mine bitcoin) and botnets (malware that creates a network of computers to do nefarious activities like bring down sites, for example) stay seemingly dormant on your computer. These types of malware use your CPU and/or GPU to perform activities that the hacker wants your computer to do. Use legitimate antivirus software to scan your computer often and make sure that there are no hidden payloads running."
  },

  {
    question: "You are making a Zoom meeting for you and your boss. You have the option of using a password. Do you:",
    answers: [
      {text: "Use the password. It's more secure.", points: 2, correct: true},
      {text: "It's just a Zoom meeting. What could go wrong?", points: 1, correct: false},
    ],
    explanation: "If you decided to not use a password, halfway through the meeting there was a random person that showed up and started harassing you. They started saying/doing disturbing things as you desperately tried to kick them off of the meeting. Your boss now blames you for the incident. Oof! Using passwords on your Zoom meeting prevents a phenomenon known as Zoombombing, or joining random rooms that are not password protected. Keep your meetings secure!"
  },

  {
    question: "You get an email stating that all your data is going to be lost! But no worries, you can keep your data by typing in your username and password into an unusual site. Do you:",
    answers: [
      {text: "Type in my username and password. I dont want to lose my data!", points: 1, correct: true},
      {text: "Open the link and explore the site a bit.", points: 2, correct: false},
      {text: "Do not click on any link and report the email as a phishing attempt.", points: 3, correct: true},
    ],
    explanation: "If you inputted your username and password, you find that someone has been posting disturbing things about people you know under your username. Your boss has just fired you and now all your friends are avoiding you. Yikes! Never put your username and password into a site that is not reputable. Be careful, phishing attack sites can be very good copies of the site they are trying to replicate. Always check the link of a site and ensure that it is identical to the one you are expecting. Additionally, check for the secure icon (make sure it is HTTPS and not HTTP)."
  },

  {
    question: "You get a text message stating that your Apple ID requires verification leading you to a confirmation link. Do you:",
    answers: [
      {text: "Type in my Apple ID and password. They're just verifying!", points: 1, correct: false},
      {text: "Do not click on the link and delete the message.", points: 2, correct: false},
      {text: "Do not click on the link, delete the message, and report as junk.", points: 3, correct: true},
    ],
    explanation: "If you inputted your Apple ID and password, you notice that there are hundreds of new subscriptions that have been paid for under your account. A bunch of new apps have been downloaded, including a $1000 application that just shows a screen saying 'I am rich'. Well there goes my vacation savings! Any time that a message wants you to verify information, be extremely cautious. Generally, the only time you should ever recieve a message like this is when you sign in and the (reputable) site states that you will recieve a security code. Unless you are expecting a verification, NEVER verify your account. It is a phishing attack. Reporting these messages is good practice, as you could be saving someone more vulnerable from this attack."
  },

  {
    question: "You are signing up for a professional site, and you have the choice of enabling 2 or multi factor authentication. Do you:",
    answers: [
      {text: "Set up multi factor authentication.", points: 2, correct: true},
      {text: "Set it up later/never. Those things are so much work anyways!", points: 1, correct: false}
    ],
    explanation: "If you did not set up multi factor authentication, you open the site the next morning and find that you just sent uhh... unprofessional messages to all of your old teachers. It wasn't me I swear! If you did set up multi factor authentication, a code would have been sent to you stating that you were trying to sign in. Because it was not you, you would have clicked 'deny' and changed your password; the hacker would not have been able to get into your account. Crisis averted! Always set up multi factor authentication if you have the chance. It usually prevents hackers from accessing your account and doing nefarious acts. The extra layer(s) of security provide a lot of much needed protection."
  }

]
