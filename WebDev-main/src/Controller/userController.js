import { users } from '../Model/userModel.js';
import jwt from 'jsonwebtoken';

export const getAll = async (req,res) => {
    try{
        const user = await users.findAll();
        res.status(200).send({data: user, message:"Data fetched successfully"});
    }catch(e){
        res.status(500).send({message: "Error fetching data", error: e.message});
    }
}

export const save = async (req, res) => {
    const body = req.body;
    console.log(body);
    try{
        const user = await users.create(body);
        res.status(201).send({data: user, message: "User created successfully"});
    }catch(e){
        res.send(501).send({message: "Error creating user", error: e.message});
    }
}
export const getUserById = async (req, res) => {
    try{
        const { id = null} = req.params;
        const user = await users.findOne({where : {id}});
        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).send({data: user, message:"Data fetched successfully"});
    }catch(e){
        res.send(e.message);
    }
}
export const updateUserById = async (req, res) => {
    try{
        const { id = null} = req.params;
        const body = req.body;
        const user = await users.update(body, {where : {id}});
        if(user[0] === 0){
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).send({data: user, message:"User updated successfully"});
    }catch(e){
        res.send(e.message);
    }
}
export const deleteUserById = async (req, res) => {
    try{
        const { id = null} = req.params;
        const user = await users.destroy({where : {id}});
        if(user === 0){
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).send({data: user, message:"User deleted successfully"});
    }catch(e){
        res.send(e.message);
    }
}

export const register = async (req, res) => {
  try {
    const { customerName, email, customerAddress, customerGender, customerType, customerPassword, confirmPassword } =
      req.body;


    if (!email || email === "") return res.status(400).json({ message: "Email required" });
    if (!customerPassword || customerPassword === "" || customerPassword === null)
      return res.status(400).json({ message: "Password required and cannot be null" });
    if (customerPassword !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    // Trim email and validate format
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) return res.status(400).json({ message: "Invalid email format" });

    const existingUser = await users.findOne({ where: { email: trimmedEmail } });
    if (existingUser)
      return res.status(400).send({ message: "Email already registered" });

    const newUser = await users.create({
      customerName: customerName,
      email: trimmedEmail,
      customerAddress: customerAddress,
      customerGender: customerGender,
      customerType: customerType,
      customerPassword: customerPassword, 
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'mysecretkey', { expiresIn: '1h' });

    res.status(201).send({ message: "User registered successfully", token });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
export const login = async (req, res) => {
  try {
    const { email, customerPassword } = req.body;


    if (!email || email === "") return res.status(400).json({ message: "Email required" });
    if (!customerPassword || customerPassword === "") return res.status(400).json({ message: "Password required" });

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) return res.status(400).json({ message: "Invalid email format" });

    const user = await users.findOne({ where: { email: trimmedEmail } });
    if (!user) return res.status(404).send({ message: "User not found" });

    if (user.customerPassword !== customerPassword) return res.status(401).send({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, 'mysecretkey', { expiresIn: '1h' });

    res.status(200).send({ message: "Login successful", token, data: { id: user.id, customerName: user.customerName, email: user.email } });
  } catch (e) {
    res.status(500).send(e.message);
  }
};