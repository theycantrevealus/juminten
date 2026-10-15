# TeRe Database Design

```mermaid
classDiagram
    direction LR

    class Keyword {
        +KeywordRewardCatalog reward_catalog
        +KeywordEligibility eligibility
        +Mixed bonus
        +KeywordNotification[] notification
        +Lov keyword_approval
        +Account hq_approver
        +Account non_hq_approver
        +boolean is_draft
        +boolean is_stoped
        +boolean need_review_after_edit
        +Keyword keyword_edit
        +Account created_by
        +Date created_at
        +Date updated_at
        +Date deleted_at
        +boolean is_main_keyword
        +KeywordChild[] child_keyword
    }

    class KeywordChild:::dto {
        +string _id
        +string name
    }

    class KeywordRewardCatalog {
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
        +Lov banefit_category
        +number price_info
        +string url_merchant
        +KeywordFlashSaleRC flashsale
        +string[] area
        +string[] region
        +Location location_type
        +Location location_area_identifier
        +Location location_region_identifier
        +boolean is_always_visible
    }

    class KeywordEligibility {
        +string name
        +Date start_period
        +Date end_period
        +string keyword_type
        +Lov point_type
        +string poin_value
        +number poin_redeemed
        +boolean channel_validation
        +Channel[] channel_validation_list
        +Channel[] channel_validation_list_info
        +ProgramV2 program_id
        +boolean eligibility_locations
        +Location[] locations
        +string program_title_expose
        +string[] program_experience
        +boolean program_bersubsidi
        +string merchant
        +boolean merchandise_keyword
        +string keyword_schedule
        +number total_budget
        +number customer_value
        +boolean multiwhitelist
        +ProgramV2[] multiwhitelist_program
        +boolean enable_sms_masking
        +string sms_masking
        +string timezone
        +boolean for_new_redeemer
        +string max_mode
        +number max_redeem_counter
        +CustomerTier[] segmentation_customer_tier
        +string segmentation_customer_los_operator
        +number segmentation_customer_los
        +number segmentation_customer_los_max
        +number segmentation_customer_los_min
        +string segmentation_customer_type
        +CustomerBadge[] segmentation_customer_most_redeem
        +CustomerBrand[] segmentation_customer_brand
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
        +Location location_type
        +Location location_area_identifier
        +Location location_region_identifier
        +string bcp_app_name
        +string imei
        +string bcp_app_name_operator
        +string bcp_app_category
        +string bcp_app_category_operator
        +string imei_operator
        +any created_by
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
        +ObjectId[] adn_target
    }

    class KeywordMaxRedeemTreshold {
        +boolean status
        +string type
        +string[] date
        +string[] time
    }

    class KeywordProgramShift {
        +string from
        +string to
    }

    class ProgramShift {
        +string from
        +string to
    }

    class KeywordApprovalLog {
        +Keyword keyword
        +Account processed_by
        +Lov status
        +string reason
        +Date approved_at
    }

    class KeywordFlashSaleRC {
        +boolean status
        +Date start_date
        +Date end_date
        +number poin
        +number stock
        +string flashsale_image
        +string flashsale_description
    }

    class KeywordNotification {
        +NotificationTemplate notification
        +string notification_content
        +string notif_type
        +string transaction_type
        +Lov via
    }

    class KeywordShift {
        +string from
        +string to
        +number max_redeem
    }

    class KeywordPriority {
        +string keyword
        +string priority
        +Date start
        +Date end
    }

    class MaxRedeemThresholds {
        +string keyword_id
        +string program
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

    class Lov {
        +string group_name
        +any set_value
        +string description
        +any additional
        +any created_by
        +Date created_at
        +Date updated_at
        +Date deleted_at
    }

    class Account {
        +string user_id
        +string core_role
        +string user_name
        +string first_name
        +string last_name
        +string job_title
        +string job_level
        +string phone
        +string email
        +Date birthdate
        +string status
        +string line_id
        +string type
        +Role role
        +Account superior_local
        +Account superior_hq
        +string manager_id
        +string agent
        +string legacy_user_id
        +Date created_at
        +Date updated_at
        +Date deleted_at
        +any account_location
    }

    class Location {
        +string code
        +string data_source
        +Location[] adhoc_group
        +string name
        +Lov type
        +Location parent
        +number lac
        +number cell_id
        +string longitude
        +string latitude
        +string area
        +string prov
        +string region
        +string city
        +Location area_id
        +Location prov_id
        +Location region_id
        +Location city_id
        +string status
        +string timezone
        +string[] region_detail
        +string[] prov_detail
        +string[] city_detail
        +any created_by
        +Date created_at
        +Date updated_at
        +Date deleted_at
    }

    class Channel {
        +string code
        +string ip
        +string name
        +string description
        +Date created_at
        +Date updated_at
        +Date deleted_at
    }

    class Merchant {
        +string partner_id
        +string partner_code
        +string company_name
        +string siup_number
        +string province_id
        +string city_id
        +string zip_code
        +string address
        +string file_compro
        +string pic_name
        +string pic_phone
        +string pic_role_id
        +string pic_role
        +string pic_email
        +string jangkauan_outlet
        +string outlet_provice_id
        +string outlet_province_id
        +string outlet_iml
        +string partner_status
        +string password
        +string source_created_at
        +string nat_loc
        +string merchant_id
        +string approver_1
        +string approver_2
        +string status_desc_1
        +string status_desc_2
        +string approver_1_status
        +string approver_2_status
        +string approver_date_1
        +string approver_date_2
        +string npwp
        +string poin_created_by
        +string is_visible
        +string branch
        +string ktp
        +string pic_ktp
        +string bank_name
        +string bank_account_name
        +string bank_account_number
        +string apps_name
        +string transaction_id
        +string channel
        +string id_business_type_1
        +string id_business_type_2
        +string callback_url
        +string origin_data
        +any created_by
        +Date created_at
        +Date updated_at
        +Date deleted_at
    }

    class CustomerTier {
        +string name
        +string description
        +string core_id
        +Date created_at
        +Date updated_at
        +Date deleted_at
    }

    class CustomerBadge {
        +string name
        +string description
        +string experience_name
        +Date created_at
        +Date updated_at
        +Date deleted_at
    }

    class CustomerBrand {
        +string name
        +string description
        +Date created_at
        +Date updated_at
        +Date deleted_at
    }

    class NotificationTemplate {
        +string code
        +Lov notif_type
        +string notif_name
        +Lov[] notif_via
        +string notif_content
        +Lov[] receiver
        +Channel[] channel_id
        +string[] variable
    }

    class KeywordFlashSaleEligibility {
        +boolean status
        +Date start_date
        +Date end_date
        +number poin
    }

    class KeywordTelcoPostpaid:::dto {
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

    class KeywordTelcoPrepaid:::dto {
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

    class KeywordLoyaltyPoin:::dto {
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

    class KeywordLuckyDraw:::dto {
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

    class KeywordAuction:::dto {
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

    class KeywordVoting:::dto {
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

    class KeywordDonation:::dto {
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

    class KeywordMobileBanking:::dto {
        +string bonus_type
        +string bank_code
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

    class KeywordLinkaja:::dto {
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

    class KeywordLinkajaVoucher:::dto {
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

    class KeywordDirectRedeem:::dto {
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

    class KeywordDiscountVoucher:::dto {
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

    class KeywordNGRS:::dto {
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

    class KeywordEAuction:::dto {
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

    class KeywordSMSAuction:::dto {
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

    class KeywordStockLocation {
        +string location_id
        +number stock
        +number stock_flashsale
        +any adhoc_group
        +string bucket
        +string name
        +number length
    }

    class LocationBucket {
        +string bucket_name
        +object bucket_type
        +object pic
        +object location_data
        +object location_type_data
        +object location_area_data
        +object location_region_data
        +Date created_at
        +Date updated_at
        +Date deleted_at
        +string element1
    }

    Keyword "*" --> "0..1" KeywordRewardCatalog : reward_catalog
    Keyword "*" --> "0..1" KeywordEligibility : eligibility
    Keyword "1" --> "*" KeywordNotification : notification
    Keyword "*" --> "0..1" Lov : keyword_approval
    Keyword "*" --> "0..1" Account : hq_approver
    Keyword "*" --> "0..1" Account : non_hq_approver
    Keyword "*" --> "0..1" Account : created_by
    Keyword "*" --> "0..1" Keyword : keyword_edit
    Keyword "1" ..> "*" KeywordChild : child_keyword

    KeywordRewardCatalog "*" --> "0..1" Lov : banefit_category
    KeywordRewardCatalog "*" --> "0..1" Location : location_type
    KeywordRewardCatalog "*" --> "0..1" Location : location_area_identifier
    KeywordRewardCatalog "*" --> "0..1" Location : location_region_identifier
    KeywordRewardCatalog "1" ..> "0..1" KeywordFlashSaleRC : flashsale

    KeywordEligibility "*" --> "0..1" Lov : keyword_type
    KeywordEligibility "*" --> "0..1" Lov : point_type
    KeywordEligibility "*" --> "0..1" Lov : program_experience
    KeywordEligibility "*" --> "0..1" Lov : adn_target
    KeywordEligibility "1" --> "*" Channel : channel_validation_list
    KeywordEligibility "*" --> "0..1" ProgramV2 : program_id
    KeywordEligibility "1" --> "*" ProgramV2 : multiwhitelist_program
    KeywordEligibility "1" --> "*" Location : locations
    KeywordEligibility "*" --> "0..1" Location : location_type
    KeywordEligibility "*" --> "0..1" Location : location_area_identifier
    KeywordEligibility "*" --> "0..1" Location : location_region_identifier
    KeywordEligibility "*" --> "0..1" Merchant : merchant
    KeywordEligibility "1" --> "*" CustomerTier : segmentation_customer_tier
    KeywordEligibility "1" --> "*" CustomerBadge : segmentation_customer_most_redeem
    KeywordEligibility "1" --> "*" CustomerBrand : segmentation_customer_brand
    KeywordEligibility "*" --> "0..1" Account : created_by

    KeywordEligibility "1" ..> "0..1" KeywordMaxRedeemTreshold : max_redeem_threshold
    KeywordEligibility "1" ..> "0..1" KeywordFlashSaleEligibility : flashsale
    KeywordEligibility "1" ..> "*" KeywordShift : keyword_shift
    KeywordEligibility "1" ..> "*" Channel : channel_validation_list_info

    KeywordApprovalLog "*" --> "0..1" Keyword : keyword
    KeywordApprovalLog "*" --> "0..1" Account : processed_by
    KeywordApprovalLog "*" --> "0..1" Lov : status

    KeywordNotification "*" --> "0..1" NotificationTemplate : notification
    KeywordNotification "*" --> "0..1" Lov : via

    MaxRedeemThresholds "*" ..> "0..1" Keyword : keyword_id
    MaxRedeemThresholds "*" ..> "0..1" ProgramV2 : program

    Lov "*" --> "0..1" Account : created_by

    Account "*" --> "0..1" Role : role
    Account "*" --> "0..1" Account : superior_local
    Account "*" --> "0..1" Account : superior_hq

    Location "1" --> "*" Location : adhoc_group
    Location "*" --> "0..1" Lov : type
    Location "*" --> "0..1" Location : parent
    Location "*" --> "0..1" Location : area_id
    Location "*" --> "0..1" Location : prov_id
    Location "*" --> "0..1" Location : region_id
    Location "*" --> "0..1" Location : city_id
    Location "*" --> "0..1" Account : created_by

    Merchant "*" --> "0..1" Account : created_by

    NotificationTemplate "*" --> "0..1" Lov : notif_type
    NotificationTemplate "1" --> "*" Lov : notif_via
    NotificationTemplate "1" --> "*" Lov : receiver
    NotificationTemplate "1" --> "*" Channel : channel_id

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
    KeywordMobileBanking "*" --> "0..1" Bank : bank_code

    KeywordStockLocation "*" --> "0..1" Location : location_id
    KeywordStockLocation "*" --> "0..1" Location : adhoc_group
    KeywordStockLocation "*" --> "0..1" LocationBucket : bucket

    LocationBucket "*" --> "0..1" Lov : bucket_type
    LocationBucket "*" --> "0..1" PIC : pic
    LocationBucket "*" --> "0..1" Location : location_data
    LocationBucket "*" --> "0..1" Lov : location_type_data
    LocationBucket "*" --> "0..1" Location : location_area_data
    LocationBucket "*" --> "0..1" Location : location_region_data

    %% === design ===
    classDef collection fill:#fff,stroke:#000,color:#000;
    classDef subdocument fill:#42f560,stroke:#1d3d60,color:#000;
    classDef takeout


```
