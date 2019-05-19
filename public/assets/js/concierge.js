var Settings = {
    init_message: "翠翔祭ホームページへようこそ！<br>私は案内人の{name}と申します。<br>質問や雑談などお気軽にお話しくださいませ。<br>質問の際はクエスチョンマークのボタンを押すか、@qに続けて検索ワードを入力してください。",
    concierge_img_url: "./images/concierge.png",
    send_icon_img_url: "./images/send-icon.png",
    question_img_url: "./images/question.png",
    KEY_ENTER: 13
}

Settings.template = `
    <div id="concierge">
        <div id="concierge-chat-box">
            <div id="concierge-chat" class="concierge-chat line-bc">
            </div>
            <div class="concierge-input">
                <img src="${Settings.question_img_url}" id="concierge-question-icon">
                <textarea id="concierge-input" placeholder="検索の際は上のボタンを押してください"></textarea>
                <img src="${Settings.send_icon_img_url}" id="concierge-send-icon">
            </div>
        </div>
    </div>
    <div id="concierge-button">
        <img src="${Settings.concierge_img_url}">
        <span>&nbsp;ご質問はこちらから&nbsp;</span>
    </div>`;

const SPEAKER_CONCIERGE = 0;
const SPEAKER_USER = 1;

const SPEAKER_CONCIERGE_BALLOON = `
    <div class="balloon6">
        <div class="faceicon">
            <img src="${Settings.concierge_img_url}">
        </div>
        <div class="chatting">
            <div class="says">
                <p>{MESSAGE}</p>
            </div>
        </div>
    </div>`;
const SPEAKER_USER_BALLOON = `
    <div class="mycomment">
        <p>{MESSAGE}</p>
    </div>`;

window.addEventListener("load", (e) => {initConcierge()});

var concierge_callbacks = [];

var logs = [];

function initConcierge() {
    var parent = document.createElement("div");
    parent.innerHTML = Settings.template;
    document.body.appendChild(parent);

    //クリック時の挙動
    document.getElementById("concierge").hidden = true;

    document.addEventListener("click", function (e) {
        var chat_box_el = document.getElementById("concierge");

        if (!chat_box_el.hidden && !closest(e.target, "#concierge")) {
            triggerChatBox();
        } else if (closest(e.target, "#concierge-button")) {
            triggerChatBox();
        }
    })

    //textarea関連
    var textarea = document.getElementById("concierge-input");
    var canEnter = false

    textarea.addEventListener("keypress", function () {
        canEnter = true
    }, false);

    textarea.addEventListener("keyup", (e) => {
        if (!canEnter) {
            return
        }
        canEnter = false
        var chat_box_el = document.getElementById("concierge");
        if (!chat_box_el.hidden && e.keyCode === Settings.KEY_ENTER) {
            sendMessage();
            e.preventDefault();
        }
    });

    document.getElementById("concierge-question-icon").addEventListener("click", (e) => {
        var textarea = document.getElementById("concierge-input");
        textarea.value += "@q  ";
        textarea.focus();
    })

    document.getElementById("concierge-send-icon").addEventListener("click", (e) => {
        sendMessage();
    })

    createMessage(Settings.init_message, SPEAKER_CONCIERGE);
}

function triggerChatBox() {
    var chat_box_el = document.getElementById("concierge");
    var chat_btn_el = document.getElementById("concierge-button");
    if (chat_box_el.hidden) {
        chat_box_el.hidden = false;
        chat_btn_el.hidden = true;
    } else {
        chat_box_el.hidden = true;
        chat_btn_el.hidden = false;
    }
}

function sendMessage(){
    let textarea = document.getElementById("concierge-input");
    if (!(textarea.value.startsWith("\n") || textarea.value === "")) {
        createMessage(textarea.value, SPEAKER_USER);

        var query = encodeURI(textarea.value);
        var url = "https://suishosai-server-php.herokuapp.com/redirect3.php";
        postData(url, createRequest("query", query), function(e){
            var status = e.target.status;
            var readyState = e.target.readyState;
            var response = e.target.responseText;
            if (status === 200 && readyState === 4) {
                
                var data = JSON.parse(response);
                
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < concierge_callbacks.length; j++) {
                        concierge_callbacks[j](data[i]);
                    }
                    createMessage(data[i], SPEAKER_CONCIERGE);
                }
            }
        });
    }
    textarea.value = "";
}

/**
 * 
 * @param {String} msg a meesage
 * @param {int} speaker a sender. (refer to constant above.)
 * 
 * @return message object
 */
function createMessage(msg, speaker) {
    var msg_balloon = "";
    var message = "";

    if (speaker === SPEAKER_CONCIERGE) msg_balloon = SPEAKER_CONCIERGE_BALLOON;
    if (speaker === SPEAKER_USER) msg_balloon = SPEAKER_USER_BALLOON;

    message = msg_balloon.replace("{MESSAGE}", msg);
    var chat = document.getElementById("concierge-chat");
    chat.innerHTML += message;

    var chat_el = document.getElementById("concierge-chat");
    chat_el.scrollTop = chat_el.scrollHeight;
}

function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    })

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}

function postData(url, data, callback){

    var xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');

    xhr.onreadystatechange = callback;

    xhr.send(data);
}

function createRequest(name, value) {
    return name + "=" + value;
}

function appendConciergeCallback(func) {
    concierge_callbacks.push(func);
}