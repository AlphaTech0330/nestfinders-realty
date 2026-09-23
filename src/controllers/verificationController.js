const User = require('../models/User');

// GET Agent Verification Form
exports.getVerificationPage = async (req, res) => {
  try {
    const agent = await User.findById(req.user.id);
    res.render('agent/verify', {
      pageTitle: 'Agent Verification | Nestfinders Realty',
      agent,
    });
  } catch (error) {
    res.status(500).send('Server Error: ' + error.message);
  }
};

// POST Submit Verification Documents
exports.submitVerification = async (req, res) => {
  try {
    const { cacNumber } = req.body;
    const files = req.files;

    if (!files || !files.governmentIdDoc || !files.cacCertDoc) {
      return res.status(400).send('Please upload both Government ID and CAC Certificate.');
    }

    const govIdPath = `/uploads/verifications/${files.governmentIdDoc[0].filename}`;
    const cacCertPath = `/uploads/verifications/${files.cacCertDoc[0].filename}`;

    await User.findByIdAndUpdate(req.user.id, {
      cacNumber,
      governmentIdDoc: govIdPath,
      cacCertDoc: cacCertPath,
      verificationStatus: 'pending',
      rejectionReason: '',
    });

    res.redirect('/agent/verify');
  } catch (error) {
    res.status(500).send('Error submitting verification: ' + error.message);
  }
};

// GET Admin Review Queue
exports.getPendingVerifications = async (req, res) => {
  try {
    const pendingAgents = await User.find({ verificationStatus: 'pending' }).sort({ createdAt: -1 });
    res.render('admin/verifications', {
      pageTitle: 'Review Agent Verifications | Admin',
      agents: pendingAgents,
    });
  } catch (error) {
    res.status(500).send('Server Error: ' + error.message);
  }
};

// POST Approve or Reject Verification
exports.reviewAgentVerification = async (req, res) => {
  try {
    const { agentId, action, rejectionReason } = req.body;

    const newStatus = action === 'approve' ? 'verified' : 'rejected';
    await User.findByIdAndUpdate(agentId, {
      verificationStatus: newStatus,
      rejectionReason: action === 'reject' ? rejectionReason : '',
    });

    res.redirect('/admin/verifications');
  } catch (error) {
    res.status(500).send('Failed to update verification status');
  }
};