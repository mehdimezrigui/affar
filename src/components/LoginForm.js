import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Modal, Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";



  const LoginForm = Form.create({ name: "form_in_modal" })(
    // eslint-disable-next-line
    class extends React.Component {
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log("Received values of form: ", values);
          }
        });
      };
  
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Sign in"
            okText="Log in"
            onCancel={onCancel}
            onOk={onCreate}            
          >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Link to="#">
                  Forgot password
                </Link>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                          
              </Form.Item>
              
            </Form>
            Or <Link to="/FormInscription">register now!</Link>
          </Modal>
        );
      }
    }
  );
export default  class CollectionsPage extends React.Component {
    state = {
      visible: false
    };
  
    showModal = () => {
      this.setState({ visible: true });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };
  
    handleCreate = () => {
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        console.log("Received values of form: ", values);
        form.resetFields();
        this.setState({ visible: false });
      });
    };
  
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
  
    render() {
      return (
        <div>
          <a onClick={this.showModal}>
            Sign In
          </a>
          <LoginForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
  }
// const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);
// export default connect()(WrappedLoginForm);
