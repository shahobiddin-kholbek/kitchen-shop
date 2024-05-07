class URLS {
    HOME = '/';
    CART = '/cart';
    PRODUCTS = '/products';
    ORDERS_HISTORY = '/orders-history';
    ADMIN = '/admin';
    PROFILE = '/profile';

    // ADMIN
    ADMIN_PAGE = '/admin-page';
    SIGN_IN = `${this.ADMIN_PAGE}/sign-in`;
    SIGN_UP = `${this.ADMIN_PAGE}/sign-up`;
    private ADMIN_MENU = `${this.ADMIN_PAGE}/menu`;
    ADD_PRODUCT = `${this.ADMIN_MENU}/add-product`;
    ALL_PRODUCTS = `${this.ADMIN_MENU}/all-products`;
    ADMIN_PROFILE = `${this.ADMIN_MENU}/profile`;

}

export const URLS_PAGES = new URLS()