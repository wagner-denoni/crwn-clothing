export const clearItemFromCart = (cartItems, cartItemToClearFromCart) => {
    return cartItems.filter(
        cartItem => cartItem.id !== cartItemToClearFromCart.id
    )
}

export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.id);

    if (existingCartItem) {
        return cartItems.map(item =>
            item.id === cartItemToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item);
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return clearItemFromCart(cartItems, existingCartItem);
    }

    return cartItems.map(cartItem =>
        (cartItem.id === cartItemToRemove.id)
            ? { ...cartItem, quantity: cartItemToRemove.quantity - 1 }
            : cartItem
    );
}