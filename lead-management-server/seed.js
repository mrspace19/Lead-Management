const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const existingAdmin = await Admin.findOne({ email: 'admin@leads.com' });

    if (existingAdmin) {
      console.log('⚠️  Admin already exists: admin@leads.com');
      console.log('   No changes made.');
    } else {
      await Admin.create({
        name: 'Super Admin',
        email: 'admin@leads.com',
        password: 'Admin@123',
      });
      console.log('✅ Default admin created successfully!');
      console.log('   Email   : admin@leads.com');
      console.log('   Password: Admin@123');
      console.log('   ⚠️  Please change these credentials after first login.');
    }
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    process.exit(0);
  }
};

seedAdmin();
