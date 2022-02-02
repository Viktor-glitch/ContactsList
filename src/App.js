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
                name: '',
                phoneNumber: '',
                showButton: false,
                showEditForm: false,
                users: JSON.parse(localStorage.getItem('users'))
            } :
            this.state = {
                user: {
                    name: '',
                    phoneNumber: ''
                },
                name: '',
                phoneNumber: '',
                showButton: false,
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
        console.log('here')
        event.preventDefault();
        let object = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber
        };
        console.log(object);
        let array = [...this.state.users, object];
        localStorage.setItem("users", JSON.stringify(array));
        this.setState({
            users: JSON.parse(localStorage.getItem('users'))
        });
    }


    render() {
        return (
            <div className="App">
                <div className="dashboard">
                    <div className="buttonSection">
                        <p>My contacts</p>
                        <button onClick={() => this.setState({showButton: !this.state.showButton})}
                                className="createNewContactButton">Create
                        </button>
                        <button className="updateSelectedContactButton">Update</button>
                        <button className="deleteSelectedContactButton">Delete</button>
                    </div>
                    <div className="createContact">
                        {this.state.showButton && <div className="inputForm">
                            <label>
                                Name:
                                <input type="text" value={this.state.name} name="name"
                                       onChange={this.handleChange}/>
                            </label>
                            <label>
                                Phone number:
                                <input type="text" value={this.state.phoneNumber} name="phoneNumber"
                                       onChange={this.handleChange}/>
                            </label>
                            <button onClick={this.handleSubmit}>Submit</button>
                        </div>}
                        <div className="editContactForm">
                            <div>
                                {this.state.user.name}
                            </div>
                            <div>
                                {this.state.user.name}
                            </div>
                        </div>
                    </div>


                    {/*<button onClick={() => this.setState({showButton: !this.state.showButton})} className="deleteSelectedContactButton">SHOW Button</button>*/}
                    {/*{this.state.showButton && <button className="deleteSelectedContactButton">SHOW ME</button>}*/}
                </div>
                <div className="contactsPanel">

                    {this.state.users.map((user) => {
                        console.log('user', user);
                        return (<div className="contact" onClick={() => alert(user.name)}>
                            <div className="name">{user.name}</div>
                            <div className="Phone Number">{user.phoneNumber}</div>
                        </div>);
                    })}
                </div>
            </div>
        );
    }
}

export default App;
