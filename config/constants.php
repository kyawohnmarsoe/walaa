<?php
return [ 
    'account_status_id' => [
        "0" => "All",
        "1" => "Active",
        "2" => "Inactive",
        "3" => "Online",
        "4" => "Offline",
        "5" => "Will be disabled",
        "6" => "Disabled",
        "7" => "Activated",        
        "8" => "Didnt pay",
        "9" => "Paid",
    ],
    'session_type' => [
        '0' => 'Any',
        '1' => 'With Internet',
        '2' => 'Without Internet'
    ],
    'ticket_source' => [ 
        'ts_1' => 'Phone',
        'ts_2' => 'Email',
        'ts_3' => 'Other'
    ], 
    'topic' => [ 
        'tp_1' => 'Inquiries',
        'tp_2' => 'Subscriber data',
        'tp_3' => 'Maintenance',
        'tp_4' => 'Accounts',
        'tp_5' => 'Administration'
    ],
    'level_of_importance' => [
        'lv_1' => 'Not important',
        'lv_2' => 'Normal',
        'lv_3' => 'Task',
        'lv_4' => 'Very important'
    ]
];

?>