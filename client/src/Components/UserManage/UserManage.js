import React, { Component } from 'react';
import ClientService from '../Utilities/ClientService';

//Components
import Modal from '../Utilities/Modal';
import '../../StyleSheets/userManage.css'
import userImage from '../../Resources/imgs/default-user-image.png';
import ManageUserPopUp from './ManageUserPopup';
import UserTable from './UserTable';

const ServiceObj = new ClientService();

class UserManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedType: "student",
            selectedUser: false,
            searchInput: "",
            facultys: [],
            isDataLoading: false
        }

        this.handleSelectType = this.handleSelectType.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.setSelectedUser = this.setSelectedUser.bind(this);
        this.setDataLoadingStatus = this.setDataLoadingStatus.bind(this);
    }

    handleSelectType(e) {
        const target = e.target;
        const name = target.options[target.selectedIndex].value;

        this.setState({
            selectedType: name
        })
        this.userTable.loadDataByTypeAndUsername(name, this.state.searchInput);
    }

    componentDidMount() {
        this.userTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput);
        this.loadFacultyData();
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    setSelectedUser(user) {
        this.setState({
            selectedUser: user
        })
    }

    setDataLoadingStatus(status) {
        this.setState({
            isDataLoading: status
        })
    }

    handleSearchButton() {
        this.userTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput);
    }

    loadFacultyData() {
        if (!this.state.isDataLoading) {
            this.setDataLoadingStatus(true);
            ServiceObj.getAllFaculty().then((data) => {
                this.setDataLoadingStatus(false);
                this.setState({
                    facultys: data,
                })
            })
        }
    }

    render() {
        return (
            <div className="subcontent-main-div user-manage">
                <div className="user-manage-box box with-title is-round">
                    <div className="box-title is-violet">
                        จัดการผู้ใช้
                    </div>
                    <div className="box-content">
                        <div className={`columns ${this.state.isDataLoading ? "disabled" : ""}`}>
                            <div className="column is-6">
                                <div className="input-with-text">
                                    <label className="label">ผู้ใช้ : </label>
                                    <select className="user-mange-select-box" onChange={this.handleSelectType} value={this.state.selectedType}>
                                        <option value="student">นิสิต</option>
                                        <option value="professor">อาจารย์</option>
                                        <option value="staff">เจ้าหน้าที่</option>
                                    </select>
                                </div>
                                <div className="input-with-text">
                                    <label className="label">รหัสประจำตัว : </label>
                                    <input className="input is-userId-width" type="text" id="userId" name="searchInput" onChange={this.handleInputChange} />
                                </div>
                                <div className="input-with-text">
                                    <button type="submit"><i className="fa fa-search height50" onClick={this.handleSearchButton}></i></button>
                                </div>
                            </div>
                            <div className="column">
                                <button className="button is-yentafo is-round is-free-size is-pulled-right" onClick={() => { this.managePopup.showManageModal("insert") }}>นำเข้าผู้ใช้โดย Excel</button>
                                <button className="button is-oros is-round is-pulled-right" onClick={() => { this.managePopup.showManageModal("insert") }}>เพิ่มผู้ใช้</button>
                            </div>
                        </div>
                        <div>
                            <span className="user-tab-is-15"></span>
                        </div>
                        <UserTable
                            ref={instance => { this.userTable = instance }}
                            showManageModal={() => { this.managePopup.showManageModal("view") }}
                            selectedType={this.state.selectedType}
                            setSelectedUser={this.setSelectedUser}
                            facultys={this.state.facultys}
                            isDataLoading={this.state.isDataLoading}
                            setDataLoadingStatus={this.setDataLoadingStatus}
                        />
                    </div>
                </div>
                <Modal ref={instance => { this.manageUserModal = instance }} content={
                    <ManageUserPopUp
                        ref={instance => { this.managePopup = instance }}
                        closeModal={() => {
                            this.manageUserModal.closeModal()
                        }}
                        showModal={() => {
                            this.manageUserModal.showModal()
                        }}
                        deleteSelectedItem={() => { this.userTable.deleteSelectedItem() }}
                        editSelectedItem={(data) => { this.userTable.editSelectedItem(data) }}
                        addItem={(data) => { this.userTable.addItem(data) }}
                        selectedType={this.state.selectedType}
                        selectedUser={this.state.selectedUser}
                        facultys={this.state.facultys}
                        isDataLoading={this.state.isDataLoading}
                        setDataLoadingStatus={(status) => { this.setDataLoadingStatus(status) }}
                    />
                }
                />
            </div>
        );
    }
}

export default UserManage;