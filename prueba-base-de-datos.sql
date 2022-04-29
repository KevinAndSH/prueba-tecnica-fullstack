-- MySQL

select * from GCGT_RE_READING as rr
join GCGT_RE_MEASUREMENT_POINT as rmp
on rr.ID_MEASURING_POINT = rmp.ID_MEASURING_POINT
join GCCOM_SECTOR_SUPPLY as ss
on ss.ID_SECTOR_SUPPLY = rmp.ID_SECTOR_SUPPLY
join GCCOM_CONTRACTED_SERVICE as cs
on cs.ID_SECTOR_SUPPLY = ss.ID_SECTOR_SUPPLY
join GCCOM_PAYMENT_FORM as pf
on cs.ID_PAYMENT_FORM = pf.ID_PAYMENT_FORM
join GCCD_RELATIONSHIP as r
on pf.ID_CUSTOMER = r.ID_RELATIONSHIP
join GCCC_CUSTOMER_TYPE as ct
on r.CUSTOMER_TYPE = ct.COD_DEVELOP
where rr.UPDATE_DATE between (current_date() - interval 3 month) and current_date()
and ct.NAME_TYPE = 'Commercial'

