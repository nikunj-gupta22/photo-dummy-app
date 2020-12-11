const Sequelize=require('sequelize');

let db;

if(process.env.DATABASE_URL){
    db=new Sequelize(process.env.DATABASE_URL)
}
else{
  
    db=new Sequelize({
        dialect:"sqlite",
        storage:__dirname+'/users.db'
    }) 
    
    
}





const Users=db.define('user',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
       type:Sequelize.DataTypes.STRING(30),
       allowNull:false,
       unique:true

    },
    email:{
        type:Sequelize.DataTypes.STRING(40)
    },
    password:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },avatar:{
        type:Sequelize.DataTypes.STRING
    }
})

module.exports={
    db, Users
}
