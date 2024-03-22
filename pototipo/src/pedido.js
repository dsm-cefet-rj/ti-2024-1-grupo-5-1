function assignButtons() {
    const items = document.querySelectorAll("#buttons")
    for (const item of items) {
        const buttons = Array.from(item.childNodes).filter(
            (elem) => elem.nodeType == Node.ELEMENT_NODE
        )
        const textArea = buttons.filter(
            (buttons => buttons.id == "quantity")
        )[0]
        textArea.innerHTML = 0
        for (const button of buttons) {
            if (button.id == "plus") {
                button.addEventListener("click", (e) => {
                    console.log('+1')
                    textArea.innerHTML = parseInt(textArea.innerHTML) + 1
                })
            }
            if (button.id == "minus") {
                button.addEventListener("click", (e) => {
                    if (textArea.innerHTML > 0) {
                        console.log('-1')
                        textArea.innerHTML = parseInt(textArea.innerHTML) - 1
                    }
                })
            }
        }
    }
}