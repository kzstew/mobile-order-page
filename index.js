import menuArray from '/data.js'

const orders = []


function getMenuItems(menuArrayPlaceholder){
    return menuArrayPlaceholder.map(function(item){
        const {name, ingredients, price, emoji, id} = item; 
        return `
        <div class="menu-item">
            <span class="item-emoji">${emoji}</span>
            <div class="item-details">
                <h3 class="item-name">${name}</h3>
                <p class="item-description">${ingredients}</p>
                <h4 class="item-price">$${price}</h4> 
            </div>
            <div class="add-icon">
                <i class="fa-solid fa-plus" data-add="${id}"></i>     
            </div>
        </div>
        `
    }).join(" ")
}

document.getElementById("menu-items").innerHTML = getMenuItems(menuArray)


document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddMenuClick(e.target.dataset.add)
     } else if (e.target.dataset.removeOrder){
        handleRemoveOrderClk(e.target.dataset.removeOrder)
    } else if (e.target.id === 'complete-order-btn'){
        handleCompleteOrderBtn()
    } else if (e.target.id === 'pay-button'){
        handlePayBtnClk()
        console.log("pay button click")
    }
})

function handleAddMenuClick(menuId) {    
    addOrders(menuId)
    renderOrders()
}

function addOrders(menuId) {
    const targetOrderArr = orders.filter(order => order.id === +menuId)

    targetOrderArr.length ? targetOrderArr[0].quantity++ 
        : orders.push({
                id: +menuId, 
                quantity: 1, 
                name: menuArray[menuId].name, 
                price: menuArray[menuId].price
            })
}

function renderOrders() {
    const orderedContainer = document.getElementById('ordered-container')
    if (orders.length) {
        orderedContainer.innerHTML = `
            <h3 class="center">Your Order</h3>
            ${getOrdersHTML()}
            <div class="total-price">
                <h3>Total Price:</h3>
                <div class="order-numbers">
                    $${orders.reduce((total, order) => 
                        total + (order.quantity * order.price),0)}
                </div>
            </div>
            <button class="complete-order-btn" id="complete-order-btn">Complete Order</button>
        `
    } else {
        orderedContainer.innerHTML = ''
    }
}

function getOrdersHTML() {
    return orders.map( order => `
        <div class="order">
            <div class="order-desc">${order.quantity} ${order.name}</div>
            <button class="remove-btn" data-remove-order="${order.id}">remove</button>
            <div class="order-numbers">$${(order.quantity * order.price)}</div>
        </div>
    `).join('')
}

function handleRemoveOrderClk(orderId) {
    const targetObj = orders.filter( order => order.id === + orderId )[0]
    targetObj.quantity--
    const targetIndex = orders.findIndex( order => order.quantity === 0)
    if (targetIndex >= 0){
        orders.splice(targetIndex, 1)
    }
    renderOrders()
}

function handleCompleteOrderBtn() {
    document.getElementById('payment-form').style.display = 'inline'
}

function handlePayBtnClk(){
    const cardForm = document.getElementById('payment-form')
    const payFormData = new FormData(cardForm)
    const fullName = payFormData.get('name')
    
    if (cardForm.checkValidity()) {
        const fullName = payFormData.get('name');
    
    document.getElementById('payment-form').style.display = 'none'
    
    orders.splice(0, orders.length)
    
    const orderedContainer = document.getElementById('ordered-container')
    
    orderedContainer.innerHTML = `
        <div class="confirm-order-message">
            <p>Thanks, ${fullName}! Your order is on its way!</p>
        </div>
    `
    cardForm.reset();}
    
}





console.log(orders)