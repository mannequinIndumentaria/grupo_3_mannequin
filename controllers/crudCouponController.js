const path = require('path');
const fs= require('fs');
const db = require('../database/models');
const { Console } = require('console');

const crudCouponController = {
    couponIndex: async (req,res) =>{
        const cupones = await db.Discount_coupon.findAll();
        res.render('crudCoupon',
        {
            coupons: cupones
        });
    },
    couponNew: async (req,res) =>{
        const cupones = await db.Discount_coupon.findAll();
        res.render('cargaCupon',
        {
            coupons: cupones
        });
    },
    couponCreate: async (req,res) => {
        console.log("BODY",req.body);
        const coupon = {
            code: req.body.code,
            percentage_amount: req.body.percentage_amount,
            cash_amount: req.body.cash_amount,
        }

        
        await db.Discount_coupon.create(coupon);
        res.redirect('/crudIndex/coupon');
    },
    couponDelete:async (req,res)=>{
        let couponID = req.params.couponId;
        await db.Discount_coupon.destroy({
            where: {
                iddiscount_coupons: couponID
            }
        })
        res.redirect('/crudIndex/coupon');

    },
    couponUse:async (req,res) => {
        let couponID = req.params.couponId;
        const coupon = {
            used: 1
        }
        
        await db.Discount_coupon.update(coupon,{
            where: { iddiscount_coupons: couponID}
        });
        res.redirect('/crudIndex/coupon');
    },

    search: async (req, res) => {
        const finalSearch = await db.Discount_coupon.findAll({
            where: {
                    code: {
                       [db.Sequelize.Op.like]: '%' + req.query.keywords + '%'
                    }
            }
        });
        res.render('crudCoupon', {
            coupons: finalSearch
        });
    }

};

module.exports = crudCouponController;