(window.webpackJsonp=window.webpackJsonp||[]).push([[10,8,9,34],{187:function(t,i,e){"use strict";var s=e(38),a=e(55),o=e(30),n=e(56),c=e(109),r=e(194);const l=(t,i)=>{const{type:e,value:s}=i;let a;if(s)return a="percentage"===e?t*(100-s)/100:t-s,a>0?a:0};var u={name:"APrices",props:{product:{type:Object,required:!0},isLiteral:Boolean,isBig:Boolean,isAmountTotal:Boolean,installmentsOption:Object,discountOption:Object,discountText:{type:[String,Boolean],default:""},canShowPriceOptions:{type:Boolean,default:!0}},data(){return{installmentsNumber:0,monthlyInterest:0,discount:{type:null,value:0},extraDiscount:{type:null,value:0,min_amount:0},discountLabel:this.discountText,pointsProgramName:null,pointsMinPrice:0,earnPointsFactor:0}},computed:{i19asOf:()=>Object(a.a)(s.r),i19from:()=>Object(a.a)(s.Gb),i19interestFree:()=>Object(a.a)(s.Ub),i19of:()=>Object(a.a)(s.Gc),i19to:()=>Object(a.a)(s.de),i19upTo:()=>Object(a.a)(s.oe),i19youEarn:()=>Object(a.a)(s.xe),price(){const t=Object(o.a)(this.product);return this.extraDiscount.value&&(!this.extraDiscount.min_amount||t>this.extraDiscount.min_amount)?l(t,this.extraDiscount):t},comparePrice(){return Object(n.a)(this.product)?this.product.base_price:this.extraDiscount.value?Object(o.a)(this.product):void 0},hasVariedPrices(){const{variations:t}=this.product;if(t){const i=Object(o.a)(this.product);for(let e=0;e<t.length;e++){if(Object(o.a)({...this.product,...t[e]})>i)return!0}}return!1},priceWithDiscount(){return this.canShowPriceOptions&&l(this.price,this.discount)},installmentValue(){if(this.canShowPriceOptions&&this.installmentsNumber>=2){if(this.monthlyInterest){const t=this.monthlyInterest/100;return this.price*t/(1-Math.pow(1+t,-this.installmentsNumber))}return this.price/this.installmentsNumber}return 0}},methods:{formatMoney:c.a,updateInstallments(t){if(t){this.monthlyInterest=t.monthly_interest;const i=t.min_installment||5,e=parseInt(this.price/i,10);this.installmentsNumber=Math.min(e,t.max_number)}},updateDiscount(t){!t||t.min_amount&&!(t.min_amount<=this.price)||this.isAmountTotal&&"total"!==t.apply_at||(this.discount=t,!this.discountText&&!1!==this.discountText&&t.label&&(this.discountLabel=`via ${t.label}`))}},watch:{price:{handler(t){this.$emit("fix-price",t)},immediate:!0}},created(){window.$setProductDomainPrice(this.product),this.canShowPriceOptions&&(this.discountOption?this.updateDiscount(this.discountOption):Object(r.a)("apply_discount").then((t=>{t.available_extra_discount&&(this.extraDiscount=t.available_extra_discount)})),this.installmentsOption?this.updateInstallments(this.installmentsOption):Object(r.a)("list_payments").then((t=>{this.updateInstallments(t.installments_option),this.updateDiscount(t.discount_option);const i=t.loyalty_points_programs;this.isLiteral&&i&&this.$nextTick((()=>{for(const t in i){const e=i[t];if(e&&e.earn_percentage>0){this.pointsMinPrice=e.min_subtotal_to_earn,this.pointsProgramName=e.name,this.earnPointsFactor=e.earn_percentage/100;break}}}))})))}};i.a=u},195:function(t,i,e){"use strict";e.d(i,"a",(function(){return s})),e.d(i,"b",(function(){return a}));var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"prices",class:{"prices--literal":t.isLiteral,"prices--big":t.isBig}},[t.comparePrice?e("span",{staticClass:"prices__compare"},[t.isLiteral?[e("small",[t._v(" "+t._s(t.i19from)+" ")]),e("s",[t._v(t._s(t.formatMoney(t.comparePrice)))]),e("small",[t._v(" "+t._s(t.i19to)+" ")])]:e("s",[t._v(t._s(t.formatMoney(t.comparePrice)))])],2):t._e(),e("strong",{staticClass:"prices__value"},[t.hasVariedPrices?e("small",[t._v(" "+t._s(t.i19asOf)+" ")]):t._e(),t._v(" "+t._s(t.formatMoney(t.price))+" ")]),e("transition-group",{attrs:{"enter-active-class":"animated slideInDown"}},[t.earnPointsFactor>0&&!(t.pointsMinPrice>t.price)?e("div",{key:"points",staticClass:"prices__points"},[e("i",{staticClass:"i-check-circle"}),t._v(" "+t._s(t.i19youEarn)+" "),e("span",[t._v(" +"+t._s((t.earnPointsFactor*t.price).toFixed(1))+" ")]),e("em",[t._v(t._s(t.pointsProgramName))])]):t._e(),t.installmentsNumber>1&&t.installmentValue?e("div",{key:"installments",staticClass:"prices__installments"},[t.isLiteral?e("small",[t._v(" "+t._s(t.i19upTo)+" ")]):t._e(),e("strong",[t._v(t._s(t.installmentsNumber)+"x")]),e("small",[t._v(t._s(t.i19of))]),e("span",[t._v(" "+t._s(t.formatMoney(t.installmentValue))+" ")]),t.monthlyInterest?t._e():e("small",[t._v(" "+t._s(t.i19interestFree)+" ")])]):t._e(),"number"==typeof t.priceWithDiscount&&t.priceWithDiscount<t.price?e("div",{key:"discount",staticClass:"prices__discount"},["string"==typeof t.discountLabel&&t.discountLabel?[e("span",[t._v(" "+t._s(t.formatMoney(t.priceWithDiscount))+" ")]),e("small",{staticClass:"prices__discount-label"},[t._v(" "+t._s(t.discountLabel)+" ")])]:[e("small",[t._v(" "+t._s(t.i19asOf)+" ")]),e("span",[t._v(" "+t._s(t.formatMoney(t.priceWithDiscount))+" ")])]],2):t._e()])],1)},a=[]},285:function(t,i,e){"use strict";e(124),e(2),e(17),e(11),e(236);var s=e(38),a=e(55),o=e(109),n=e(5),c=e(13),r=e(41),l=e(258);var u={name:"DiscountApplier",components:{AAlert:l.a},props:{amount:Object,couponCode:String,hasCouponInput:{type:Boolean,default:!0},isFormAlwaysVisible:Boolean,isCouponApplied:Boolean,isAttentionWanted:Boolean,canAddFreebieItems:{type:Boolean,default:!0},modulesPayload:Object,paymentGateway:Object,ecomCart:{type:Object,default:()=>c.a},customer:Object,canPassManyDiscountApps:Boolean,ecomPassport:{type:Object,default:()=>r.a}},data(){return{alertText:null,alertVariant:null,isFormVisible:this.isFormAlwaysVisible||this.couponCode,isLoading:!1,localCouponCode:this.couponCode,localAmountTotal:null,isUpdateSheduled:!1}},computed:{i19add$1ToGetDiscountMsg:()=>Object(a.a)({en_us:"Add more $1 to cart to get the discount.",pt_br:"Adicione mais $1 ao carrinho para ganhar o desconto."}),i19add:()=>Object(a.a)(s.i),i19addDiscountCoupon:()=>Object(a.a)(s.k),i19code:()=>Object(a.a)(s.R),i19couponAppliedMsg:()=>Object(a.a)(s.eb),i19discountCoupon:()=>Object(a.a)(s.jb),i19hasCouponOrVoucherQn:()=>Object(a.a)(s.Lb),i19invalidCouponMsg:()=>Object(a.a)(s.Xb),i19campaignAppliedMsg:()=>Object(a.a)(s.F),canAddCoupon(){return!this.couponCode||!this.isCouponApplied||this.couponCode!==this.localCouponCode},paymentGatewayDiscount(){if(!this.paymentGateway)return 0;const{discount:t}=this.paymentGateway;if(!t||!t.value)return 0;const i=t.apply_at||"total",e="total"===i?this.localAmountTotal:this.amount[i];if(e>0){const{type:i,value:s}=t;return"percentage"===i?e*s/100:s<=e?s:e}return 0}},methods:{fixAmount(){const t=this.amount||{subtotal:this.ecomCart.data.subtotal};this.localAmountTotal=Math.round(100*((t.subtotal||0)+(t.freight||0)-this.paymentGatewayDiscount))/100},parseDiscountOptions(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=0,e=!1;if(t.length){let s,a,c;t.forEach((t=>{const{validated:r,error:l,response:u}=t;if(r&&!l){const r=u.discount_rule;if(r)if(this.canPassManyDiscountApps)i?(r.extra_discount.value+=i,s=r):s={app_id:t.app_id,...r},i=r.extra_discount.value;else{const e=r.extra_discount.value;i>e||(i=e,s={app_id:t.app_id,...r})}else u.available_extra_discount&&u.available_extra_discount.min_amount&&(a=this.i19add$1ToGetDiscountMsg.replace("$1",Object(o.a)(u.available_extra_discount.min_amount-this.amount.subtotal)),c="info");if(u.invalid_coupon_message&&(a=u.invalid_coupon_message),this.canAddFreebieItems){const t=u.freebie_product_ids;Array.isArray(t)&&t.length&&(e=!0,p=this.ecomCart,d=t,Array.isArray(d)?(p.data.items.forEach((t=>{let{_id:i,product_id:e,flags:s}=t;s&&s.includes("freebie")&&!d.includes(e)&&p.removeItem(i)})),d.forEach((t=>{!p.data.items.find((i=>i.product_id===t&&i.flags&&i.flags.includes("freebie")))&&Object(n.g)({url:`/products/${t}.json`}).then((i=>{let{data:e}=i;!(e.quantity>0)||e.variations&&e.variations.length||p.addProduct({...e,flags:["freebie","__tmp"]},null,d.reduce(((i,e)=>e===t?i+1:i),0))})).catch(console.error)}))):p.data&&p.data.items&&p.data.items.length&&p.data.items.forEach((t=>{let{_id:i,flags:e}=t;e&&e.includes("freebie")&&p.removeItem(i)})),this.localCouponCode&&this.$emit("update:coupon-code",this.localCouponCode))}}var p,d})),i?(this.localCouponCode?a?(this.alertText=a,this.alertVariant=c||"warning"):(this.$emit("update:coupon-code",this.localCouponCode),this.alertText=this.i19couponAppliedMsg,this.alertVariant="info"):(this.alertText=this.i19campaignAppliedMsg,this.alertVariant="info"),this.$emit("set-discount-rule",s)):(this.localCouponCode&&!e?(this.alertText=a||this.i19invalidCouponMsg,this.alertVariant=c||"warning"):this.alertText=null,this.$emit("set-discount-rule",{}))}},fetchDiscountOptions(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.isLoading=!0;const i=this.customer||this.ecomPassport.getCustomer();i&&(i._id||i.doc_number)&&(t.customer={},i._id&&(t.customer._id=i._id),i.display_name&&(t.customer.display_name=i.display_name),i.doc_number&&(t.customer.doc_number=i.doc_number));const e={...this.modulesPayload,amount:{subtotal:this.localAmountTotal,...this.amount,total:this.localAmountTotal,discount:this.paymentGatewayDiscount},items:this.ecomCart.data.items,...t};e.domain&&(e.domain+=".skip-open"),Object(n.c)({url:"/apply_discount.json",method:"POST",data:e}).then((t=>{let{data:i}=t;return this.parseDiscountOptions(i.result)})).catch((t=>{console.error(t),this.alertVariant="danger",this.alertText=Object(a.a)(s.wb)})).finally((()=>{this.isLoading=!1}))},submitCoupon(t){if(t||this.canAddCoupon){const{localCouponCode:t}=this,i={discount_coupon:t};this.fetchDiscountOptions(i)}},updateDiscount(){let t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.couponCode?!t&&this.isCouponApplied||this.submitCoupon(t):(t||!this.isUpdateSheduled&&this.amount&&this.localAmountTotal)&&this.fetchDiscountOptions()},scheduleUpdateDiscount(){this.isUpdateSheduled||(this.isUpdateSheduled=!0,this.$nextTick((()=>{setTimeout((()=>{this.updateDiscount(),this.isUpdateSheduled=!1}),600)})))}},watch:{couponCode(t){t!==this.localCouponCode&&(this.localCouponCode=t,t&&!this.isFormVisible&&(this.isFormVisible=!0))},localCouponCode(){"info"===this.alertVariant&&(this.alertText=null)},isFormAlwaysVisible(t){t&&(this.isFormVisible=!0)},isFormVisible(t){t&&this.$nextTick((()=>{this.$refs.input.focus()}))},localAmountTotal(t,i){null!==i&&Math.abs(t-i)>.02&&this.scheduleUpdateDiscount()},amount:{handler(){this.fixAmount()},deep:!0},paymentGatewayDiscount(){this.scheduleUpdateDiscount()}},mounted(){this.fixAmount(),this.updateDiscount(!1)}};i.a=u}}]);