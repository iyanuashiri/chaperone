const sleep = (miliseconds) => {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
};


async function main(message, sender) {
    let minute = 600000;
    await sleep(minute);
    browser.tabs.remove(sender.tab.id);

}

browser.runtime.onMessage.addListener(main);


