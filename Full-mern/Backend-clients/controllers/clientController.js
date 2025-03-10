const Client = require('../models/client'); 

exports.createClient = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const newClient = new Client({ name, email, phone, address });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ message: 'Error creating client', error: err });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients', error: err });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching client', error: err });
  }
};

exports.updateClient = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json({ message: 'Error updating client', error: err });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted', client: deletedClient });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting client', error: err });
  }
};

exports.getClientCount = async (req, res) => {
  try {
    const count = await Client.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Error counting clients', error: err });
  }
};
