/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CBuildingService from '../../Services/BuildingService'
import ErrorModal from '../Utilities/ErrorModal'
import InfoModal from '../Utilities/InfoModal'

// Components
import Modal from '../Utilities/Modal'

import '../../StyleSheets/home.css'
import '../../StyleSheets/addBuilding.css'

const BuildingService = new CBuildingService()
class AddBuilding extends Component {
  _isMounted = false;
  constructor (props) {
    super(props)
    this._isMounted = true
    this.state = {
      selectedRow: null,
      selectedBuilding: null,
      dataBuilding: [],
      searchShortName: ''
    }
    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
    this.setSelectedBuilding = this.setSelectedBuilding.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.loadBuildingByShortName = this.loadBuildingByShortName.bind(this)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentDidMount () {
    this.loadBuilding()
  }

  loadBuilding () {
    BuildingService.getAllBuilding().then((data) => {
      this.setDataBuilding(data)
    })
  }

  loadBuildingByShortName () {
    console.log('finding')
    BuildingService.getAllBuilding().then((data) => {
      this.searchBuildingByShortName(data)
    })
  }

  appendObjTo (thatArray, newObj) {
    var frozenObj = Object.freeze(newObj)
    return Object.freeze(thatArray.concat(frozenObj))
  }

  searchBuildingByShortName (data) {
    if (this.state.searchShortName === '') {
      this.setDataBuilding(data)
    } else {
      var myArray = []
      var newArray = []
      var txtLower = this.state.searchShortName.toLowerCase()
      var checkFind = false
      for (let i = 0; i < data.length; i++) {
        var shortNameToLower = data[i].short_name.toLowerCase()
        if (shortNameToLower.includes(txtLower)) {
          newArray = this.appendObjTo(myArray, data[i])
          myArray = newArray
          checkFind = true
        }
      }
      console.log(myArray)
      if (checkFind === false) {
        this.setDataBuilding(myArray)
      } else {
        this.setDataBuilding(myArray)
      }
    }
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  setDataBuilding (data) {
    if (this._isMounted) {
      this.setState({
        dataBuilding: data
      })
    }
  }

  renderTableHead () {
    return (
      <tr className="is-header">
        <th>รหัสตึก</th>
        <th >ชื่อตึก</th>
        <th >จำนวนชั้น</th>
      </tr>
    )
  }

  loadDataIntoTable () {
    var returnData = []

    for (var i = 0; i < this.state.dataBuilding.length; i++) {
      returnData[i] = <BuildingTableItem
        key={i}
        selectItem={(e) => { this.selectItem(e) }}
        itemIndex={i}
        itemData={this.state.dataBuilding[i]}
      />
    }
    return returnData
  }

  setSelectedBuilding (building) {
    this.setState({
      selectedBuilding: building
    })
  }

  selectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('user-table-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow != null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })
        this.setSelectedBuilding(this.state.dataBuilding[parent.getAttribute('index')].short_name)
      }
    }
  }

  deleteButtonHandle () {
    BuildingService.deleteBuilding(this.state.selectedBuilding).then((result) => {
      if (result) {
        this.loadBuilding()
        this.infoModal.showModal('ลบสำเร็จ')
      } else {
        this.errorModal.showModal('ลบไม่สำเร็จ!')
      }
    })
  }

  render () {
    return (
      <div className="subcontent-main-div home">
        <div className="box with-title is-round">
          <div className="box-title is-violet">
            จัดการตึก
          </div>
          <div className="box-content">
            <div className="columns">
              <div className="column is-pulled-left ">
                <div className="input-with-find-building ">
                  <label className="label">รหัสตึก : </label>
                  <input className="input is-building-width" type="text" name="searchShortName" value={this.state.searchShortName} onChange={this.handleInputChange} />
                </div>
                <div className="input-with-find-building">
                  <button type="submit"><i className="fa fa-search height50" onClick={this.loadBuildingByShortName} ></i></button>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-pulled-left building-table-auto">
                <table className="user-table" id="buildingTable" >
                  <thead>
                    {this.renderTableHead()}
                  </thead>
                  <tbody>
                    {this.loadDataIntoTable()}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-bottom">
            </div>
            <div className="columns">
              <div className="column is-building-button">
                <button className="button is-oros is-round" onClick={() => { this.manageBuildingPopUp.showModal() }}>เพิ่มตึก</button>
                <button className="button is-yentafo is-round" onClick={this.deleteButtonHandle.bind(this)}>ลบตึก</button>
              </div>
            </div>
          </div>
        </div>
        <ErrorModal
          ref={instance => { this.errorModal = instance }}
        />
        <InfoModal
          ref={instance => { this.infoModal = instance }}
        />
        <Modal ref={instance => { this.manageBuildingPopUp = instance }} content={
          <BuildingPopUp closeBuildingPopUp={() => { this.manageBuildingPopUp.closeModal() }}
            reloadTable={() => { this.loadBuilding() }}
          />}
        />
      </div>
    )
  }
}

class BuildingTableItem extends Component {
  constructor (props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem () {
    return (
      <tr className="user-table-item"
        onClick={(e) => { this.props.selectItem(e) }}
        index={this.props.itemIndex}
      >
        <td>{this.props.itemData.short_name}</td>
        <td>{this.props.itemData.building_name}</td>
        <td>{this.props.itemData.floors}</td>
      </tr>
    )
  }

  render () {
    return (this.renderItem())
  }
}

class BuildingPopUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputShortNameBuilding: '',
      inputNameBuilding: '',
      inputFloorsBuilding: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.addButtonPopUpHandle = this.addButtonPopUpHandle.bind(this)
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  setBuldingInput (name, shortname, floor) {
    this.setState({
      inputNameBuilding: name,
      inputShortNameBuilding: shortname,
      inputFloorsBuilding: floor
    })
  }

  addButtonPopUpHandle () {
    // eslint-disable-next-line radix
    var floorInt = parseInt(this.state.inputFloorsBuilding)
    if (floorInt <= 0 || isNaN(floorInt) || this.state.inputNameBuilding === '' || this.state.inputShortNameBuilding === '' || this.state.inputFloorsBuilding === '') {
      this.errorModal.showModal('กรุณาใส่ข้อมูลให้ถูกต้อง')
    } else {
      var newBuilding = {}
      newBuilding.building_name = this.state.inputNameBuilding
      newBuilding.short_name = this.state.inputShortNameBuilding
      newBuilding.floors = floorInt
      newBuilding.Rooms = []

      const buildingObj = BuildingService.createBuildingDataObject(newBuilding)
      BuildingService.addBuilding(buildingObj.getBuildingObjectData()).then((result) => {
        if (result) {
          this.infoModal.showModal('เพิ่มสำเร็จ')
          this.setBuldingInput('', '', '')
          this.props.reloadTable()
        } else {
          this.errorModal.showModal('เพิ่มไม่สำเร็จ!')
        }
      })
    }
  }

  render () {
    return (
      <div className="box " style={{ width: '500px' }}>
        <div className="columns">
          <label className="label font-size-2" >เพิ่มตึก</label>
        </div>
        <br />
        <div className="columns">
          <div className="column is-building-popup">
            <label className="label font-size-1" >ชื่อตึก</label>
          </div>
          <div className="column">
            <input className="input is-building-popup-width " type="text" value={this.state.inputNameBuilding} name="inputNameBuilding" onChange={this.handleInputChange} />
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column is-building-popup">
            <label className="label font-size-1" >รหัสตึก</label>
          </div>
          <div className="column">
            <input className="input is-building-popup-width " type="text" value={this.state.inputShortNameBuilding} name="inputShortNameBuilding" onChange={this.handleInputChange} />
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column is-building-popup">
            <label className="label font-size-1" >จำนวนชั้น</label>
          </div>
          <div className="column">
            <input className="input is-building-popup-width " type="text" value={this.state.inputFloorsBuilding} name="inputFloorsBuilding" onChange={this.handleInputChange} />
          </div>
        </div>
        <br />
        <div className="columns">
          <button className="button is-oros is-round" onClick={this.addButtonPopUpHandle}>บันทึก</button>
          <button className="button is-yentafo is-round" onClick={this.props.closeBuildingPopUp}>ยกเลิก</button>
        </div>
        <ErrorModal
          ref={instance => { this.errorModal = instance }}
        />
        <InfoModal
          ref={instance => { this.infoModal = instance }}
        />
      </div>
    )
  }
}

export default AddBuilding
