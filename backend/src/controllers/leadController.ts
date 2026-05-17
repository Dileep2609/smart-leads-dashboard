import { Request, Response } from "express";

import Lead from "../models/Lead";

// CREATE LEAD
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET LEADS
export const getLeads = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 10;

    const search = req.query.search || "";

    const status = req.query.status || "";

    const source = req.query.source || "";

    let query: any = {};

    // FILTER STATUS
    if (status) {
      query.status = status;
    }

    // FILTER SOURCE
    if (source) {
      query.source = source;
    }

    // SEARCH
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE LEAD
export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DELETE LEAD
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    res.json({
      success: true,
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
