# Keyword Class

```mermaid
%%{ init: { 'flowchart': { 'curve': 'stepBefore' } } }%%
classDiagram
    direction LR

    note for Keyword "Unique:\nreward_catalog.program\nreward_catalog.keyword\neligibility.name"

    class Keyword {
        +ObjectId _id [PK]
        +KeywordRewardCatalog reward_catalog [FK]
        +KeywordEligibility eligibility [FK]
        +KeywordBonus[] bonus
        +KeywordNotification[] notification [FK]
        +Lov keyword_approval [FK]
        +Account hq_approver [FK]
        +Account non_hq_approver [FK]
        +boolean is_draft
        +boolean is_stoped
        +boolean need_review_after_edit
        +Keyword keyword_edit [FK]
        +Account created_by [FK]
        +Date created_at
        +Date updated_at
        +Date deleted_at
        +boolean is_main_keyword
        +KeywordChild[] child_keyword

        +AlertKeywordTobeExpiredService:getData()
        +ReportKeywordWithStockService:getAllKeywords()
        +ReportTransactionProgramService:getAllKeywords()
        +ReportingProgramHistoryService:counterGroupKeyword()
        +ReportingRewardService:updateRewardReport()
        +ReportingRewardService:activeList()
        +RewardCatalogXMLService:getRewardCatalog()
        +AccountService:validateChangeLocation()
        +KeywordExpiredAlertGeneralJobService:job1()
        +KeywordExpiredAlertSpecificJobService:job1()
        +KeywordQuotaAlertJobService:job1()
        +KeywordService:all_old()
        +KeywordService:segmentation()
        +KeywordService:all()
        +KeywordService:all_revamp()
        +KeywordService:detail()
        +KeywordService:detailRevamp()
        +KeywordService:checkKeywordNameExist()
        +KeywordService:detailFromName()
        +KeywordService:detailv2()
        +KeywordService:findRegexKeywordByName()
        +KeywordService:findKeywordByName()
        +KeywordService:findKeywordByNameWithRedis()
        +KeywordService:add()
        +KeywordService:delete()
        +KeywordService:edit()
        +KeywordService:checkAvailKeyword()
        +KeywordService:getKeywordByName()
        +KeywordService:approveKeyword()
        +KeywordService:approveKeywordV2()
        +KeywordService:rejectKeyword()
        +KeywordService:rejectKeywordV2()
        +KeywordService:get_keyword_by_program_id()
        +KeywordService:checkUniqueKeyword()
        +KeywordService:editisdraft()
        +KeywordService:getkeywordProfile()
        +KeywordService:getKeywordByID()
        +KeywordService:updateKeywordById()
        +KeywordService:getKeywordCustomParams()
        +KeywordService:getKeywordWhere()
        +KeywordService:listRewardCatalogXml()
        +KeywordService:stopKeyword()
        +KeywordService:changeKeywordOwner()
        +KeywordService:setIntialStockFlashSale()
        +KeywordService:syncStockToRedisHset()
        +ProgramServiceV2:stopProgram()
        +ProgramServiceV2:getListIdLocation()
        +ProgramBenefitService:validateKeywordPointType()
        +StockService:actualStock()
        +StockService:cronResetStockFlashSale()
        +TelegramService:findKeywordsByName()
        +BidService:validateKeyword()
        +DonationService:donate()
        +DonationService:donateEligibility()
        +EauctionService:total_bidder_per_keyword()
        +EauctionService:top_bidder_per_keyword()
        +TransKeywordService:keyword_status()
        +TransKeywordService:keywordStockRedis()
        +RewardCatalogueService:get_reward_by_points()
        +VoucherFmcService:voucher_verification()
        +VoucherService:voucherCheckUpdate()
        +VoucherService:totalVoucherSummaryFromCore()
        +VoucherService:checkingKeywordVoucherVerification()
        +VoteService:voting_all()
        +VoteService:voting_desc()
        +VoteService:generateFilters()
        +VoteService:voting_detail()
        +PostpaidGranularService:getBidDataFromRedis()
        +PrepaidGranularService:getBidDataFromRedis()
        +RewardCatalogXMLService:getRewardCatalog()
        +SlRedisService:loadKeyword()
    }

    class KeywordBonus {
        <<interface>>
    }

    class KeywordRewardCatalog:::subdocument {
        +string program
        +string keyword
        +string keyword_type
        +string hashtag_1
        +string hashtag_2
        +string hashtag_3
        +string[] catalog_type
        +string[] catalog_display
        +string start_period
        +string end_period
        +number point_keyword
        +number poin_markup_display
        +string[] applied_on
        +string[] special_applied_on
        +string[] channel
        +string enable_for_corporate_subs
        +string effective
        +string to
        +string[] microsite_segment
        +string title
        +string teaser
        +string teaser_en
        +string description
        +string description_en
        +string faq
        +string faq_en
        +string image_promo_loc
        +string image_detail_loc
        +string image_detail_1_loc
        +string image_detail_2_loc
        +string image_detail_3_loc
        +string image_small
        +string image_medium
        +string image_large
        +string[] province
        +string[] city
        +string how_to_redeem
        +string how_to_redeem_en
        +string video
        +string google_maps
        +boolean hot_promo
        +string category
        +string merchant_id
        +string created_at
        +string updated_at
        +string stock
        +string link_aja_voucher_title
        +string link_aja_voucher_description
        +number link_aja_voucher_poin_price
        +string link_aja_voucher_banner_image
        +string flash_sale_banner_image
        +number voting_target_redeemer
        +object[] voting_options

        %% banefit_category change to benefit_category
        +Lov banefit_category [FK]
        +number price_info
        +string url_merchant
        +KeywordFlashSaleRC flashsale
        +string[] area
        +string[] region
        +Location location_type [FK]
        +Location location_area_identifier [FK]
        +Location location_region_identifier [FK]
        +boolean is_always_visible
    }

    class KeywordEligibility:::subdocument {
        +string name
        +Date start_period
        +Date end_period
        +string keyword_type [FK]
        +Lov point_type [FK]
        +string poin_value
        +number poin_redeemed
        +boolean channel_validation
        +Channel[] channel_validation_list [FK]
        +Channel[] channel_validation_list_info
        +Program program_id [FK]
        +boolean eligibility_locations
        +Location[] locations [FK]
        +string program_title_expose
        +string[] program_experience [FK]
        +boolean program_bersubsidi
        +string merchant [FK]
        +boolean merchandise_keyword
        +string keyword_schedule
        +number total_budget
        +number customer_value
        +boolean multiwhitelist
        +Program[] multiwhitelist_program [FK]
        +boolean enable_sms_masking
        +string sms_masking
        +string timezone
        +boolean for_new_redeemer
        +string max_mode
        +number max_redeem_counter
        +CustomerTier[] segmentation_customer_tier [FK]
        +string segmentation_customer_los_operator
        +number segmentation_customer_los
        +number segmentation_customer_los_max
        +number segmentation_customer_los_min
        +string segmentation_customer_type
        +CustomerBadge[] segmentation_customer_most_redeem [FK]
        +CustomerBrand[] segmentation_customer_brand [FK]
        +any segmentation_customer_brand_info
        +boolean segmentation_customer_prepaid_registration
        +boolean segmentation_customer_kyc_completeness
        +string segmentation_customer_poin_balance_operator
        +number segmentation_customer_poin_balance
        +number segmentation_customer_poin_balance_min
        +number segmentation_customer_poin_balance_max
        +string segmentation_customer_preference
        +string segmentation_customer_arpu_operator
        +number segmentation_customer_arpu
        +number segmentation_customer_arpu_min
        +number segmentation_customer_arpu_max
        +string segmentation_customer_preferences_bcp
        +any file
        +boolean segmentation_employee_numbers
        +KeywordShift[] keyword_shift
        +boolean eligibility_location
        +Location location_type [FK]
        +Location location_area_identifier [FK]
        +Location location_region_identifier [FK]
        +string bcp_app_name
        +string imei
        +string bcp_app_name_operator
        +string bcp_app_category
        +string bcp_app_category_operator
        +string imei_operator
        +any created_by [FK]
        +Date created_at
        +Date updated_at
        +Date deleted_at
        +any segmentation_customer_tier_info
        +any segmentation_telkomsel_employee
        +string flash_sale_start_date
        +string flash_sale_end_date
        +number flash_sale_poin
        +number flash_sale_quota
        +KeywordMaxRedeemTreshold max_redeem_threshold
        +KeywordFlashSaleEligibility flashsale
        +ObjectId[] adn_target [FK]
    }

    class KeywordMaxRedeemTreshold:::subdocument {
        +boolean status
        +string type
        +string[] date
        +string[] time
    }

    class KeywordApprovalLog {
        +ObjectId _id [PK]
        +Keyword keyword [FK]
        +Account processed_by [FK]
        +Lov status [FK]
        +string reason
        +Date approved_at
    }

    class KeywordFlashSaleRC:::subdocument {
        +boolean status
        +Date start_date
        +Date end_date
        +number poin
        +number stock
        +string flashsale_image
        +string flashsale_description
    }

    class KeywordNotification {
        +ObjectId _id [PK]
        +Keyword keyword [FK]
        +Lov bonus_type_id [FK]
        +string keyword_name
        +string code_identifier
        +string notification_content
        +Date start_period
        +Date end_period
        +Lov notif_type [FK]
        +string[] via
        +string[] receiver
    }

    class KeywordChild:::subdocument {
        +string _id
        +string name
    }

    class KeywordShift {
        +ObjectId _id [PK]
        +string from
        +string to
        +number max_redeem
    }

    class KeywordPriority {
        +ObjectId _id [PK]
        +string keyword
        +string priority
        +Date start
        +Date end
    }

    class MaxRedeemThresholds {
        +ObjectId _id [PK]
        +string keyword_id [FK]
        +string program [FK]
        +string max_mode
        +string keyword
        +string type
        +string[] date
        +string[] time
        +string start_date
        +string end_date
        +Date created_at
        +Date updated_at
        +Date deleted_at
    }

    class NotificationTemplate {
        +ObjectId _id [PK]
        +string code
        +Lov notif_type [FK]
        +string notif_name
        +Lov[] notif_via [FK]
        +string notif_content
        +Lov[] receiver [FK]
        +Channel[] channel_id [FK]
        +string[] variable
    }

    class KeywordFlashSaleEligibility:::subdocument {
        +boolean status
        +Date start_date
        +Date end_date
        +number poin
    }

    class KeywordTelcoPostpaid:::subdocument {
        +string bonus_type
        +string telco_post_product_name
        +string telco_post_bid
        +string telco_post_api_config
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordTelcoPrepaid:::subdocument {
        +string bonus_type
        +string telco_pre_product_name
        +string telco_pre_bid
        +string telco_pre_api_config
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordLoyaltyPoin:::subdocument {
        +string bonus_type
        +number earning_poin
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordLuckyDraw:::subdocument {
        +string bonus_type
        +boolean lucky_draw_reguler
        +boolean lucky_draw_allow_inject_coupon
        +string lucky_draw_prize
        +boolean redeem_after_verification
        +KeywordStockLocation[] stock_location
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
        +number bonus_quantity
    }

    class KeywordAuction:::subdocument {
        +string bonus_type
        +string auction_prize_desc_id
        +string auction_prize_desc_en
        +string auction_prize_image
        +number auction_poin_min_bidding
        +number auction_multiplier_poin
        +number auction_max_winner_inphase
        +string auction_prize_name
        +boolean redeem_after_verification
        +KeywordStockLocation[] stock_location
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordVoting:::subdocument {
        +string bonus_type
        +number target_vote
        +KeywordStockLocation[] stock_location
        +object[] voting_options
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordDonation:::subdocument {
        +string bonus_type
        +string donation_category
        +number minimum_poin
        +number target_poin
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordMobileBanking:::subdocument {
        +string bonus_type
        +string bank_code [FK]
        +string ip_address
        +string digit_coupon
        +string combination_coupon
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordLinkaja:::subdocument {
        +string bonus_type
        +number nominal
        +boolean external_api_config
        +string bucket
        +string location
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordLinkajaVoucher:::subdocument {
        +string bonus_type
        +string partner_voucher_id
        +string expiry_date
        +KeywordStockLocation[] stock_location
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordDirectRedeem:::subdocument {
        +string bonus_type
        +string stock_type
        +string merchandise
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordDiscountVoucher:::subdocument {
        +string bonus_type
        +string exp_voucher
        +string voucher_type
        +string voucher_combination
        +number jumlah_total_voucher
        +string voucher_prefix
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordNGRS:::subdocument {
        +string bonus_type
        +number nominal
        +boolean external_api_config
        +string bucket
        +string location
        +KeywordStockLocation[] stock_location
        +boolean redeem_after_verification
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
        +string flexibility
    }

    class KeywordEAuction:::subdocument {
        +string bonus_type
        +number auction_poin_min_bidding
        +number auction_multiplier_poin
        +string auction_multiplier_identifier
        +string auction_prize_name
        +string auction_prize_desc_id
        +string auction_prize_desc_en
        +string auction_prize_image
        +KeywordStockLocation[] stock_location
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
    }

    class KeywordSMSAuction:::subdocument {
        +string bonus_type
        +number auction_poin_min_bidding
        +number auction_multiplier_poin
        +string auction_multiplier_identifier
        +string auction_prize_name
        +KeywordStockLocation[] stock_location
        +string stock_type
        +number threshold
        +string start_date
        +string end_date
        +string[] hour
    }

    class KeywordStockLocation:::subdocument {
        +string location_id [FK]
        +number stock
        +number stock_flashsale
        +any adhoc_group [FK]
        +string bucket [FK]
        +string name
        +number length
    }

    Keyword "*" --> "0..1" KeywordRewardCatalog : reward_catalog
    Keyword "*" --> "0..1" KeywordEligibility : eligibility
    Keyword "1" --> "*" KeywordNotification : notification
    Keyword "*" --() "0..1" keyword_approval-Lov
    Keyword "*" --() "0..1" hq_approver-Account
    Keyword "*" --() "0..1" non_hq_approver-Account
    Keyword "*" --() "1" created_by-Account
    Keyword "*" --> "0..1" Keyword : keyword_edit
    Keyword "1" ..> "*" KeywordChild : child_keyword

    Keyword "1" ..> "*" KeywordBonus : bonus

    KeywordBonus <|.. KeywordTelcoPostpaid
    KeywordBonus <|.. KeywordTelcoPrepaid
    KeywordBonus <|.. KeywordLoyaltyPoin
    KeywordBonus <|.. KeywordLuckyDraw
    KeywordBonus <|.. KeywordAuction
    KeywordBonus <|.. KeywordVoting
    KeywordBonus <|.. KeywordDonation
    KeywordBonus <|.. KeywordMobileBanking
    KeywordBonus <|.. KeywordLinkaja
    KeywordBonus <|.. KeywordLinkajaVoucher
    KeywordBonus <|.. KeywordDirectRedeem
    KeywordBonus <|.. KeywordDiscountVoucher
    KeywordBonus <|.. KeywordNGRS
    KeywordBonus <|.. KeywordEAuction
    KeywordBonus <|.. KeywordSMSAuction

    KeywordRewardCatalog "*" --() "0..1" banefit_category-Lov
    KeywordRewardCatalog "*" --() "0..1" location_type-Location
    KeywordRewardCatalog "*" --() "0..1" location_area_identifier-Location
    KeywordRewardCatalog "*" --() "0..1" location_region_identifier-Location
    KeywordRewardCatalog "1" ..> "0..1" KeywordFlashSaleRC : flashsale

    KeywordEligibility "*" --() "0..1" keyword_type-Lov
    KeywordEligibility "*" --() "0..1" point_type-Lov
    KeywordEligibility "*" --() "0..1" program_experience-Lov
    KeywordEligibility "*" --() "0..1" adn_target-Lov
    KeywordEligibility "1" --() "*" channel_validation_list-Channel
    KeywordEligibility "*" --() "0..1" program_id-Program
    KeywordEligibility "1" --() "*" multiwhitelist_program-Program
    KeywordEligibility "1" --() "*" locations-Location
    KeywordEligibility "*" --() "0..1" location_type-Location
    KeywordEligibility "*" --() "0..1" location_area_identifier-Location
    KeywordEligibility "*" --() "0..1" location_region_identifier-Location
    KeywordEligibility "*" --() "0..1" merchant-Merchant
    KeywordEligibility "1" --() "*" segmentation_customer_tier-CustomerTier
    KeywordEligibility "1" --() "*" segmentation_customer_most_redeem-CustomerBadge
    KeywordEligibility "1" --() "*" segmentation_customer_brand-CustomerBrand
    KeywordEligibility "*" --() "0..1" created_by-Account

    KeywordEligibility "1" ..> "0..1" KeywordMaxRedeemTreshold : max_redeem_threshold
    KeywordEligibility "1" ..> "0..1" KeywordFlashSaleEligibility : flashsale
    KeywordEligibility "1" ..> "*" KeywordShift : keyword_shift
    KeywordEligibility "1" --() "*" channel_validation_list_info-Channel

    KeywordApprovalLog "*" --> "0..1" Keyword : keyword
    KeywordApprovalLog "*" --() "0..1" processed_by-Account
    KeywordApprovalLog "*" --() "0..1" status-Lov

    KeywordNotification "*" --> "0..1" NotificationTemplate : notification
    KeywordNotification "*" --() "0..1" via-Lov

    MaxRedeemThresholds "*" ..> "0..1" Keyword : keyword_id
    MaxRedeemThresholds "*" --() "0..1" program-Program

    NotificationTemplate "*" --() "0..1" notif_type-Lov
    NotificationTemplate "1" --() "*" notif_via-Lov
    NotificationTemplate "1" --() "*" receiver-Lov
    NotificationTemplate "1" --() "*" channel_id-Channel

    KeywordTelcoPostpaid "1" ..> "*" KeywordStockLocation : stock_location
    KeywordTelcoPrepaid "1" ..> "*" KeywordStockLocation : stock_location
    KeywordLoyaltyPoin "1" ..> "*" KeywordStockLocation : stock_location
    KeywordLuckyDraw "1" ..> "*" KeywordStockLocation : stock_location
    KeywordAuction "1" ..> "*" KeywordStockLocation : stock_location
    KeywordVoting "1" ..> "*" KeywordStockLocation : stock_location
    KeywordDonation "1" ..> "*" KeywordStockLocation : stock_location
    KeywordMobileBanking "1" ..> "*" KeywordStockLocation : stock_location
    KeywordLinkaja "1" ..> "*" KeywordStockLocation : stock_location
    KeywordLinkajaVoucher "1" ..> "*" KeywordStockLocation : stock_location
    KeywordDirectRedeem "1" ..> "*" KeywordStockLocation : stock_location
    KeywordDiscountVoucher "1" ..> "*" KeywordStockLocation : stock_location
    KeywordNGRS "1" ..> "*" KeywordStockLocation : stock_location
    KeywordEAuction "1" ..> "*" KeywordStockLocation : stock_location
    KeywordSMSAuction "1" ..> "*" KeywordStockLocation : stock_location
    KeywordMobileBanking "*" --() "0..1" bank_code-Bank

    KeywordStockLocation "*" --() "0..1" location_id-Location
    KeywordStockLocation "*" --() "0..1" adhoc_group-Location
    KeywordStockLocation "*" --() "0..1" bucket-LocationBucket

    %% === design ===
    classDef default fill:#fff,stroke:#000,color:#000;
    classDef subdocument fill:#00a666,stroke:#1d3d60,color:#fff;
    classDef takeout fill:#941919,stroke:#1d3d60,color:#fff;
    classDef untrack fill:#947b19,stroke:#1d3d60,color:#fff;
```
