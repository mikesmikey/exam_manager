import React, { Component } from "react";
import {
  NavLink
} from 'react-router-dom';

class MainScrenMenuBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonPointer : null
    }

    this.handleMenuDropDown = this.handleMenuDropDown.bind(this);
    this.handleButtonPointer = this.handleButtonPointer.bind(this);
  }

  dropDownSwitch(id) {
    var element = document.getElementById(id);

    if (element.classList.contains("dropdown-hide")) {
      element.classList.remove("dropdown-hide")
      element.classList.add("dropdown-active");
    } else {
      element.classList.remove("dropdown-active");
      element.classList.add("dropdown-hide")
    }
  }

  handleMenuDropDown(e) {
    if (e.target.id === "car_manage_button" && this.state.buttonPointer !== "sub_car_manage") {
      this.dropDownSwitch("car_manage_list");
    } else if (e.target.id === "fix_manage_button" && this.state.buttonPointer !== "sub_fix_manage") {
      this.dropDownSwitch("fix_manage_list");
    } else if (e.target.id === "part_manage_button" && this.state.buttonPointer !== "sub_part_manage") {
      this.dropDownSwitch("part_manage_list");
    }
  }

  handleButtonPointer(e) {
    this.setState({
      buttonPointer : e.target.type
    })
  }

  render() {
    return (
      <aside className="menu main-menu">
        <div className="menu-space"></div>
        <ul className="menu-list">
          <li>
            <NavLink to="/" activeClassName="is-active is-orange" onClick={this.handleButtonPointer}>
              <i className="fas fa-home menu-icon"></i>
              หน้าแรก
            </NavLink>
          </li>
          <li>
            <NavLink to="/plate_license" activeClassName="is-active is-black-oros" onClick={this.handleButtonPointer}>
              <i className="fas fa-money-check menu-icon"></i>
              จัดการต่อทะเบียน
            </NavLink>
          </li>
          <li>
            <a id="car_manage_button"
              onClick={this.handleMenuDropDown}
            >
              <i className="fas fa-car menu-icon"></i>
              จัดการซื้อ-ขายรถ
            </a>
            <ul id="car_manage_list" className="dropdown-hide">
              <li>
                <NavLink to="/car_buy" activeClassName="is-active is-black-oros" type="sub_car_manage" onClick={this.handleButtonPointer}>
                  จัดการซื้อรถ
              </NavLink>
              </li>
              <li>
                <NavLink to="/car_sell" activeClassName="is-active is-black-oros" type="sub_car_manage" onClick={this.handleButtonPointer}>
                  จัดการขายรถ
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <a id="fix_manage_button"
              onClick={this.handleMenuDropDown}
            >
              <i className="fas fa-tools menu-icon"></i>
              จัดการซ่อมรถ
            </a>
            <ul id="fix_manage_list" className="dropdown-hide">
              <li>
                <NavLink to="/car_fix" activeClassName="is-active is-black-oros" type="sub_fix_manage" onClick={this.handleButtonPointer}>
                  จัดการซ่อม
                </NavLink>
              </li>
              <li>
                <NavLink to="/car_part" activeClassName="is-active is-black-oros" type="sub_fix_manage" onClick={this.handleButtonPointer}>
                  จัดการอะไหล่ในส่วนการซ่อม
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
          <a id="part_manage_button"
              onClick={this.handleMenuDropDown}
            >
              <i className="fas fa-boxes menu-icon"></i>
              จัดการอะไหล่
            </a>
            <ul id="part_manage_list" className="dropdown-hide">
              <li>
                <NavLink to="/part_company" activeClassName="is-active is-black-oros" type="sub_part_manage" onClick={this.handleButtonPointer}>
                  จัดการบริษัทอะไหล่
                </NavLink>
              </li>
              <li>
                <NavLink to="/part_order" activeClassName="is-active is-black-oros" type="sub_part_manage" onClick={this.handleButtonPointer}>
                  จัดการใบสั่งซื้ออะไหล่
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/partner_manage" activeClassName="is-active is-black-oros" onClick={this.handleButtonPointer}>
              <i className="fas fa-user-tie menu-icon"></i>
              จัดการคู่ค้า
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer_manage" activeClassName="is-active is-black-oros" onClick={this.handleButtonPointer}>
              <i className="fas fa-address-card menu-icon"></i>
              จัดการลูกค้า
            </NavLink>
          </li>
        </ul>
      </aside>
    );
  }
}

export default MainScrenMenuBar;