const Salle = require('../models/salle');

exports.sallePage = async(req,res)=>{
    try{
        const salles = await Salle.find();
        res.render('salles',{salles:salles});
    }catch(err){
        res.status(400).send(err)
    }
}

exports.salleCreatePage = (req,res)=>{
    res.render('createSalle')
}

exports.createSalle = async(req,res)=>{
    try{
        const {nom,capacity} = req.body;
        const salleNom = await Salle.findOne({nom: nom});
        if(salleNom){
            return res.status(404).send('salle already exist!');
        }  
        const salle = new Salle({nom,capacity});
        await salle.save();
        res.redirect('/salle');

    }catch(err){
        res.status(403).send(err)
    }
}

exports.salleUpdatePage = async(req,res)=>{
    try{
        const id = req.params.id;
        const salle = await Salle.findById({_id:id});
        console.log(salle);
        res.render('updateSalle',{salle:salle});

    }catch(err){
        res.status(403).send(err)
    }
}

exports.updateSalle = async(req,res)=>{
    try{
        const {salleId,number,capacity} = req.body
        const salle = await Salle.findByIdAndUpdate(salleId,{_id:salleId,number:number,capacity:capacity});
        res.redirect(`/salle`);


    }catch(err){
        res.status(403).send(err)
    }
}

exports.deleteSalle = async(req,res)=>{
    try{
        const deleteSalle = await Salle.findByIdAndDelete({_id:req.params.id});
        res.redirect(`/salle`);
    }catch(err){
        res.status(403).send(err)
    }
}
