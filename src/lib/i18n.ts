import type { Locale } from '@/types/store';

export const locales: Locale[] = ['tr','en','ar'];
export const defaultLocale: Locale = 'tr';
export const isLocale = (v: string): v is Locale => locales.includes(v as Locale);

export const dict = {
  tr: {
    home:'HOME', products:'PRODUCTS', size:'YOUR SIZE', about:'ABOUT', contact:'CONTACT', cart:'SEPET',
    shopNow:'ALIŞVERİŞE BAŞLA', collection:'DUTHUR PRODUCTS', addToCart:'Sepete ekle', soldOut:'Tükendi',
    selectSize:'Beden seç', quantity:'Adet', subtotal:'Ara toplam', checkout:'Ödemeye geç', continueShopping:'Alışverişe devam et',
    yourCart:'Sepetiniz', emptyCart:'Sepetiniz boş', checkoutTitle:'Ödeme', contactTitle:'İletişim', delivery:'Teslimat',
    firstName:'Ad', lastName:'Soyad', email:'E-posta', phone:'Telefon', province:'İl', district:'İlçe', address:'Adres',
    addressDetails:'Bina / Kat / Daire (opsiyonel)', postalCode:'Posta kodu (opsiyonel)', discountCode:'İndirim kodu',
    shippingMethod:'Teslimat yöntemi', standardShipping:'Kargo', pickup:'Elden teslim', placeOrder:'Siparişi onayla',
    total:'Toplam', discount:'İndirim', shipping:'Kargo', bankTransfer:'Banka havalesi', orderConfirmed:'Siparişiniz alındı',
    orderNumber:'Sipariş No', findSize:'Bedenimi bul', height:'Boy (cm)', weight:'Kilo (kg)', recommended:'Önerilen beden',
    sizeNote:'Bu tahmini bir öneridir. Vücut oranları ve tercih edilen kalıp sonucu etkileyebilir.', send:'Gönder', message:'Mesaj',
    sizeChart:'Beden Tablosu', materialFit:'Materyal & Kalıp', shippingInfo:'Kargo', care:'Bakım', featured:'Öne çıkanlar'
  },
  en: {
    home:'HOME', products:'PRODUCTS', size:'YOUR SIZE', about:'ABOUT', contact:'CONTACT', cart:'CART',
    shopNow:'SHOP NOW', collection:'DUTHUR PRODUCTS', addToCart:'Add to cart', soldOut:'Sold out',
    selectSize:'Select size', quantity:'Quantity', subtotal:'Subtotal', checkout:'Checkout', continueShopping:'Continue shopping',
    yourCart:'Your cart', emptyCart:'Your cart is empty', checkoutTitle:'Checkout', contactTitle:'Contact', delivery:'Delivery',
    firstName:'First name', lastName:'Last name', email:'Email', phone:'Phone', province:'Province', district:'District', address:'Full address',
    addressDetails:'Building / Floor / Door (optional)', postalCode:'Postal code (optional)', discountCode:'Discount code',
    shippingMethod:'Shipping method', standardShipping:'Shipping', pickup:'Hand-to-hand pickup', placeOrder:'Confirm order',
    total:'Total', discount:'Discount', shipping:'Shipping', bankTransfer:'Bank transfer', orderConfirmed:'Order confirmed',
    orderNumber:'Order number', findSize:'Find my size', height:'Height (cm)', weight:'Weight (kg)', recommended:'Recommended size',
    sizeNote:'This is an estimate. Body proportions and fit preference can affect the result.', send:'Send', message:'Message',
    sizeChart:'Size Chart', materialFit:'Material & Fit', shippingInfo:'Shipping', care:'Care', featured:'Featured'
  },
  ar: {
    home:'الرئيسية', products:'المنتجات', size:'مقاسك', about:'من نحن', contact:'تواصل معنا', cart:'السلة',
    shopNow:'تسوق الآن', collection:'منتجات دُثُر', addToCart:'أضف إلى السلة', soldOut:'نفد',
    selectSize:'اختر المقاس', quantity:'الكمية', subtotal:'المجموع الفرعي', checkout:'إتمام الطلب', continueShopping:'متابعة التسوق',
    yourCart:'سلة التسوق', emptyCart:'السلة فارغة', checkoutTitle:'إتمام الطلب', contactTitle:'تواصل معنا', delivery:'التوصيل',
    firstName:'الاسم الأول', lastName:'اسم العائلة', email:'البريد الإلكتروني', phone:'رقم الهاتف', province:'المحافظة', district:'المنطقة / الحي', address:'العنوان الكامل',
    addressDetails:'المبنى / الطابق / رقم الباب (اختياري)', postalCode:'الرمز البريدي (اختياري)', discountCode:'كود الخصم',
    shippingMethod:'طريقة الاستلام', standardShipping:'الشحن', pickup:'استلام يد بيد', placeOrder:'تأكيد الطلب',
    total:'الإجمالي', discount:'الخصم', shipping:'الشحن', bankTransfer:'تحويل بنكي', orderConfirmed:'تم استلام طلبك',
    orderNumber:'رقم الطلب', findSize:'اعرف مقاسك', height:'الطول (سم)', weight:'الوزن (كجم)', recommended:'المقاس المقترح',
    sizeNote:'هذا ترشيح تقريبي، وقد يختلف حسب شكل الجسم وطريقة اللبس المفضلة.', send:'إرسال', message:'الرسالة',
    sizeChart:'جدول المقاسات', materialFit:'الخامة والقصة', shippingInfo:'الشحن', care:'العناية', featured:'مختارات'
  }
} as const;

export function getText(product: any, field: 'title'|'description'|'material_fit'|'shipping'|'care', locale: Locale) {
  return product[`${field}_${locale}`] || product[`${field}_en`] || '';
}
