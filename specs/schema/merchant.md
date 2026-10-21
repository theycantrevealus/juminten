# Merchant Class

mermaid
%%{ init: { 'flowchart': { 'curve': 'stepBefore' } } }%%
classDiagram
    direction LR

    note for Merchant "Unique:\nmerchant_short_code"
    note for Outlet "Unique:\noutlet_code"
    note for MerchantOutlet "Unique:\nmerchant + outlet"
    note for Partner "Unique:\npartner_code"

    class Merchant:::collection {
        +ObjectId _id [PK]
        +string merchant_short_code
        +string merchant_name
        +string siup_number
        +string npwp
        +string ktp
        +string address
        +string zip_code
        +string file_compro
        +string merchant_logo
        +boolean is_visible
        +string apps_name
        +string callback_url
        +Partner partner [FK]
        +Location location [FK]
        +Location location_type [FK]
        +Location location_area_identifier [FK]
        +Location location_region_identifier [FK]
        +MerchantPIC pic
        +MerchantBank bank
        +MerchantApproval[] approval
        +MerchantContent[] content
        +MerchantHyperlink[] hyperlink
        +Lov[] business_type [FK]
        +Account created_by [FK]
        +Date created_at
        +Date updated_at
        +Date deleted_at

        +MerchantV2Service:get_merchant()
        +MerchantV2Service:detail()
        +MerchantV2Service:addMerchant()
        +MerchantV2Service:editMerchant()
        +MerchantV2Service:deleteMerchant()
        +MerchantV2Service:imageupload()
        +MerchantOutletService:generateMerchantOutletXmlFileV2()
    }

    class MerchantPIC:::subdocument {
        +string name
        +string phone
        +string email
        +string ktp
        +Role role [FK]
    }

    class MerchantBank:::subdocument {
        +string name
        +string account_name
        +string account_number
    }

    class MerchantApproval:::subdocument {
        +number level
        +Account approver [FK]
        +string status
        +string description
        +Date approved_at
    }

    class MerchantContent:::subdocument {
        +MultiLang title
        +MultiLang content
    }

    class MerchantHyperlink:::subdocument {
        +string url
        +MultiLang title
    }

    class MultiLang:::subdocument {
        +string id
        +string en
    }

    class MerchantUntrack:::untrack {
        +string legacy_merchant_id
        +string legacy_partner_id
        +string source_created_at
        +string nat_loc
        +string origin_data
        +string transaction_id
        +string channel
    }

    class MerchantTakeout:::takeout {
        +string company_name
        +string partner_code
        +string partner_status
        +string province_id
        +string city_id
        +string pic_role
        +string password
        +string jangkauan_outlet
        +string outlet_provice_id
        +string outlet_province_id
        +string outlet_iml
        +string branch
        +string poin_created_by
        +string approver_1
        +string approver_2
        +string approver_1_status
        +string approver_2_status
        +string status_desc_1
        +string status_desc_2
        +string approver_date_1
        +string approver_date_2
        +string id_business_type_1
        +string id_business_type_2
        +Outlet[] outlet
    }

    class Outlet:::collection {
        +ObjectId _id [PK]
        +string outlet_code
        +string outlet_name
        +string outlet_address
        +string longitude
        +string latitude
        +Location regional [FK]
        +Location branch [FK]
        +Location location [FK]
        +Location location_type [FK]
        +Location location_area_identifier [FK]
        +Location location_region_identifier [FK]
        +Account created_by [FK]
        +Date created_at
        +Date updated_at
        +Date deleted_at

        +OutletService:get_outlet()
        +OutletService:get_outlet_detail()
        +OutletService:addOutlet()
        +OutletService:editOutlet()
        +OutletService:deleteOutlet()
    }

    class OutletTakeout:::takeout {
        +boolean show_linked
        +ObjectId merchant_id
        +object merchant_detail
    }

    class MerchantOutlet:::collection {
        +ObjectId _id [PK]
        +Merchant merchant [FK]
        +Outlet outlet [FK]
        +Account created_by [FK]
        +Date created_at
        +Date updated_at
        +Date deleted_at

        +MerchantOutletService:get_merchant_outlet()
        +MerchantOutletService:get_merchant_outlet_detail()
        +MerchantOutletService:addOutletsToMerchant()
        +MerchantOutletService:editMerchantOutlet()
        +MerchantOutletService:deleteMerchantOutlet()
    }

    class Partner:::collection {
        +ObjectId _id [PK]
        +string partner_code
        +string partner_name
        +string registration_number
        +string priority
        +string contact_person
        +string phone
        +string contact_email
        +string address
        +string website
        +string remark
        +string status
        +string npwp
        +string partner_logo
        +string longitude
        +string latitude
        +Account created_by [FK]
        +Date created_at
        +Date updated_at
        +Date deleted_at

        +MerchantPatnerService:get_merchant()
        +MerchantPatnerService:get_patner_prime()
        +MerchantPatnerService:add()
        +MerchantPatnerService:edit()
        +MerchantPatnerService:delete()
    }

    Merchant <|-- MerchantPIC
    Merchant <|-- MerchantBank
    Merchant <|-- MerchantApproval
    Merchant <|-- MerchantContent
    Merchant <|-- MerchantHyperlink
    MerchantContent <|-- MultiLang
    MerchantHyperlink <|-- MultiLang
    Merchant <|-- MerchantUntrack
    Merchant <|-- MerchantTakeout
    Outlet <|-- OutletTakeout

    MerchantOutlet "*" --() "1" merchant-Merchant
    MerchantOutlet "*" --() "1" outlet-Outlet

    Merchant "*" --() "0..1" partner-Partner
    Merchant "*" --() "0..1" location-Location
    Merchant "*" --() "0..1" location_type-Location
    Merchant "*" --() "0..1" location_area_identifier-Location
    Merchant "*" --() "0..1" location_region_identifier-Location
    Merchant "*" --() "0..1" created_by-Account
    Merchant "*" --() "*" business_type-Lov
    MerchantPIC "*" --() "0..1" role-Role
    MerchantApproval "*" --() "0..1" approver-Account

    Outlet "*" --() "0..1" regional-Location
    Outlet "*" --() "0..1" branch-Location
    Outlet "*" --() "0..1" location-Location
    Outlet "*" --() "0..1" location_type-Location
    Outlet "*" --() "0..1" location_area_identifier-Location
    Outlet "*" --() "0..1" location_region_identifier-Location

    Merchant "0..1" --() "*" merchant-KeywordEligibility
    Merchant "0..1" --() "*" merchant_id-KeywordRewardCatalog
    Merchant "0..1" --() "*" merchant_id-Redeem
    Merchant "0..1" --() "*" merchant_id-Voucher
    Merchant "0..1" --() "*" merchant_id-VerificationVoucher

    %% === design ===
    classDef collection fill:#fff,stroke:#000,color:#000;
    classDef subdocument fill:#00a666,stroke:#1d3d60,color:#fff;
    classDef takeout fill:#941919,stroke:#1d3d60,color:#fff;
    classDef untrack fill:#947b19,stroke:#1d3d60,color:#fff;