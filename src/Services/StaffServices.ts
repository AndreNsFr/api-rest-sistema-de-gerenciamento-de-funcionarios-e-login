import { Request, Response } from "express";
import { Istaff } from "../Models/Staff";
import StaffRepository from "../Repository/StaffRepository";

const staffRepository = new StaffRepository()

class StaffServices {
    createStaff(data: Istaff) {
        return staffRepository.createStaff(data)
    }

    updateStaff(data: Istaff, cpf) {
        return staffRepository.updateStaff(data, cpf)
    }

    deleteStaff(cpf) {
        return staffRepository.deleteStaff(cpf)
    }

    getStaff(cpf) {
        return staffRepository.getStaff(cpf).then((x) => {
            return x
        }).catch(() => {
            return { error: 'erro ao pesquisar usutario' }
        })
    }
}

export default StaffServices