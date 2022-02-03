import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        localStorage.getItem("users") ?
            this.state = {
                user: {
                    name: '',
                    phoneNumber: ''
                },
                showSubmitButton:true,
                name: '',
                phoneNumber: '',
                showInputForm: false,
                showEditForm: false,
                users: JSON.parse(localStorage.getItem('users'))
            } :
            this.state = {
                user: {
                    name: '',
                    phoneNumber: ''
                },
                name: '',
                showSubmitButton:true,
                phoneNumber: '',
                showInputForm: false,
                showEditForm: false,
                users: []
            }

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let object = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber
        };
        console.log(object);
        let array = [...this.state.users, object];
        localStorage.setItem("users", JSON.stringify(array));
        this.setState({
            users: JSON.parse(localStorage.getItem('users')),
            name:'',
            phoneNumber:''
        });
    }
    handleUpdate = (event) =>{
        event.preventDefault();
        let object = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber
        };
        let array =[];
        this.state.users.map((u) =>{
            (u.name === this.state.user.name &&
                u.phoneNumber === this.state.user.phoneNumber) ?
                array.push(object):
                array.push(u);
        })
        localStorage.setItem("users", JSON.stringify(array));
        this.setState({
            users: JSON.parse(localStorage.getItem('users')),
            showEditForm: false,
            showInputForm: false,
            showSubmitButton:true,
            name:'',
            phoneNumber:''
        });
    }


    render() {
        return (
            <div className="App">
                <div className="dashboard">
                    <div className="buttonSection">
                        <p>My contacts</p>
                        <button onClick={() =>
                            this.setState({showInputForm: !this.state.showInputForm,
                                showEditForm: false})}
                                className="createNewContactButton">Create
                        </button>
                    </div>
                        {this.state.showInputForm && <div className="inputForm">
                            {/*{this.state.showSubmitButton ? this.setState({name:'',phoneNumber:''}): ''}*/}
                            <label className="nameLabel">
                                Name:
                                <input type="text" value={this.state.name} name="name"
                                       onChange={this.handleChange}/>
                            </label>
                            <label className="phoneNumberLabel">
                                Phone number:
                                <input type="text" value={this.state.phoneNumber} name="phoneNumber"
                                       onChange={this.handleChange}/>
                            </label>
                            {this.state.showSubmitButton && <button onClick={this.handleSubmit}>Submit</button>}
                            {!this.state.showSubmitButton && <button onClick={this.handleUpdate}>Update</button>}
                        </div>}
                        {this.state.showEditForm && <div className="editContactForm">
                            <div>
                                {this.state.user.name}
                            </div>
                            <div>
                                {this.state.user.phoneNumber}
                            </div>
                            <button className="editSelectedContactButton" onClick={
                                () => {
                                    this.setState({showEditForm:false, showSubmitButton:false, showInputForm:true,
                                    name:this.state.user.name, phoneNumber:this.state.user.phoneNumber});
                                }
                            }>Edit</button>
                            <button className="deleteSelectedContactButton" onClick={
                                () => {
                                    let array = [];
                                    this.state.users.map((u) => {
                                        !(u.name === this.state.user.name &&
                                        u.phoneNumber === this.state.user.phoneNumber) ?
                                            array.push(u) :
                                            alert("Contact deleted successfully!");
                                    })
                                    localStorage.setItem("users", JSON.stringify(array));
                                    this.setState({
                                        users: JSON.parse(localStorage.getItem('users')),
                                        showEditForm: false
                                    });
                                }

                            }>Delete</button>
                        </div>}



                    {/*<button onClick={() => this.setState({showInputForm: !this.state.showInputForm})} className="deleteSelectedContactButton">SHOW Button</button>*/}
                    {/*{this.state.showInputForm && <button className="deleteSelectedContactButton">SHOW ME</button>}*/}
                </div>
                <div className="contactsPanel">

                    {this.state.users.map((u) => {
                        console.log('user', u);
                        return (<div className="contact" onClick={() => {
                            let obj = {
                                name: u.name,
                                phoneNumber: u.phoneNumber
                            }
                            this.setState({user: obj,
                                                showInputForm: false,
                                                showEditForm: true});

                        }
                        }>
                            <div className="name">{u.name}</div>
                            <div className="Phone Number">{u.phoneNumber}</div>
                        </div>);
                    })}
                </div>
            </div>
        );
    }
}

export default App;
