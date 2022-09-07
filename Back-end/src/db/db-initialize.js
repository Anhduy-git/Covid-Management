const Address = require('../models/Address/address');
const TreatmentPlace = require('../models/TreatmentPlace/treatment-place');
const {StatusCodes} = require('http-status-codes');

const addresses = [
    {
        name: "Cần Thơ",
        districts: [
            {                
                name: "Ninh Kiều",
                wards: [
                    {                        
                        name: "Tân An"                        
                    },
                    {
                        name: "Cái Khế"
                    },
                    {
                        name: "An Hòa"
                    },
                    {
                        name: "An Cư"
                    },
                    {
                        name: "An Hội"
                    }
                ]                
            },
            {                
                name: "Cờ Đỏ",
                wards: [
                    {                        
                        name: "Đông Hiệp"                        
                    },
                    {
                        name: "Đông Thắng"
                    },
                    {
                        name: "Thạnh Phú"
                    },
                    {
                        name: "Thới Đông"
                    },
                    {
                        name: "Thới Hưng"
                    }
                ]                
            },
            {                
                name: "Cái Răng",
                wards: [
                    {                        
                        name: "Lê Bình"                        
                    },
                    {
                        name: "Thường Thạnh"
                    },
                    {
                        name: "Phú Thứ"
                    },
                    {
                        name: "Tân Phú"
                    },
                    {
                        name: "Hưng Phú"
                    }
                ]                
            }
        ]
    }
];


const treatmentPlaces = [
    {
        name: "Bệnh viện đa khoa thành phố",
        capacity: 300,
        currentPatients:0
    },
    {
        name: "Bệnh viện 30/4",
        capacity: 200,
        currentPatients:0
    },
    {
        name: "Bệnh viện Nhiệt Đới",
        capacity: 150,
        currentPatients:0
    },
    {
        name: "Bệnh viện Nguyễn Trãi",
        capacity: 180,
        currentPatients:0
    },
    {
        name: "Bệnh viện Phạm Ngọc Thạch",
        capacity: 230,
        currentPatients:0
    }
]

const initializeDB = async() => {
    try {        
        //initialize addresses 
        let addressList = await Address.find({});
        if (addressList.length == 0) {
            await Address.insertMany(addresses);
        }    
        //initialize places of treatment
        let treatmentPlaceList = await TreatmentPlace.find({});
        if (treatmentPlaceList.length == 0) {
            await TreatmentPlace.insertMany(treatmentPlaces);
        }        
        console.log("Data has been initialized!");        
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
    }
};

module.exports = initializeDB;