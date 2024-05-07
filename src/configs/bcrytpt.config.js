userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };