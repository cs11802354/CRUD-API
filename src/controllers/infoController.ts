import { Request, Response } from "express";
//importing then database so that to run different queries on it.
import IS from '../dataMod';
// the following are the different endpoints of application
// it will run according to the given query. these end points are being called
// from entry point which is "app.ts".
/*
it creates a list of objects itertating over database and finally send that list.
it uses inbuilt find() function
*/
export let allInfo = (req: Request, res: Response) => {
    let infos = IS.find((err: any, infos: any) => {
      if (err) {
        res.send("Error!");
      } else {
        res.send(infos);
      }
    });
  };
/*
by using inbuilt findVById function i fetch the object from the database and
finally send this response.
*/
export let getInfo = (req: Request, res: Response) => {
    let info = IS.findById(req.params.id, (err: any, info: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(info);
      }
    });
  };
// first it finds the object by its id. since the object is type of dictionary
// so i iterate it through the key, when the key matches with p1 i simple store it and the device name
// locally because i want to show only p1 value and device name.
  export let getInfoPm1 = (req: Request, res: Response) => {
    let info = IS.findById(req.params.id, (err: any, info: any) => {
      if (err) {
        res.send(err);
      } else {
        var device = "";
        var pm_value = 0;
        for (let key in info) {
          let value = info[key];
          if(key=="device"){
            device = value;
          }
          if(key=="p1"){
            pm_value=value;
          }
        }
        var final = device + " , p1_value = "+pm_value;
        res.send(final);
      }
    });
  };
// first it finds the object by its id. since the object is type of dictionary
// so i iterate it through the key, when the key matches with p25 i simple store it and the device name
// locally because i want to show only p25 value and device name.
  export let getInfoPm25 = (req: Request, res: Response) => {
    let info = IS.findById(req.params.id, (err: any, info: any) => {
      if (err) {
        res.send(err);
      } else {
        var device = "";
        var pm_value = 0;
        for (let key in info) {
          let value = info[key];
          if(key=="device"){
            device = value;
          }
          if(key=="p25"){
            pm_value=value;
          }
        }
        var final = device + " , p2.5_value = "+pm_value;
        res.send(final);
      }
    });
  };
// first it finds the object by its id. since the object is type of dictionary
// so i iterate it through the key, when the key matches with p10 i simple store it and the device name
// locally because i want to show only p10 value and device name.
  export let getInfoPm10 = (req: Request, res: Response) => {
    let info = IS.findById(req.params.id, (err: any, info: any) => {
      if (err) {
        res.send(err);
      } else {
        var device = "";
        var pm_value = 0;
        for (let key in info) {
          let value = info[key];
          if(key=="device"){
            device = value;
          }
          if(key=="p10"){
            pm_value=value;
          }
        }
        var final = device + " , p10_value = "+pm_value;
        res.send(final);
      }
    });
  };
  /*
  by using deleteOne function it deletes the object. this function takes id as argumnet.
  */ 
  export let deleteInfo = (req: Request, res: Response) => {
    let info = IS.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully Deleted Info");
      }
    });
  };

/*
  it take input from body and then using the argument it finds that object and update it with this
  input.
*/
  export let updateInfo = (req: Request, res: Response) => {
    console.log(req.body);
    let info = IS.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, info: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated Info!");
        }
      }
    );
  };

  /*
  it take input from body and create a instance of IS object and then store it in the 
  data base.
  */
  export let addInfo = (req: Request, res: Response) => {
    var newInfo = new IS(req.body);
  
    newInfo.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(newInfo);
      }
    });
  };


/*
  The following function first takes the argumnet and split it "-" and time.
  since it is a range denated by using a hyphen so splitting based on "-"
  after that there is two string i,e the start time and the end time.
  
  Again I am splitting the both string to calculate both start time and end time in unit seconds.

  when i have start time and end time in number form i am using it in next step for validation of each
  devices whether it lies in this range or not.

  I iterates the data base and store the objects in a list and then i iterate over the list
  and obtain the object.
  since the object has many attributes so i find the the 't' by doing iteration and calculate it
  numerical value in second by usnig split function and Number function to change str to number.
  if it lies in the range then i append it in the valid list.

  finally i have valid list of object which are found in between this range 
  so send it.
  */

  export let findRange = (req: Request, res: Response) => {
    var parStr = req.params.id;
    
    var splitted = parStr.split("-",2);
    var a = splitted[0].split(":",3);
    var b = splitted[1].split(":",3);
    var lowBound = Number(a[0])*3600+Number(a[1])*60+Number(a[2]);
    var upperBound = Number(b[0])*3600+Number(b[1])*60+Number(b[2]);
    
    let infos = IS.find((err: any, infos: any) => {
      
      if (err) {
        res.send("Error!");
      } else {
        var flag = 0;
        let final = [];
        for (let key in infos) {
          let value = infos[key];
          for(let key1 in value){
              let value1 = value[key1];
              if(key1 == "t"){
                var splits = value1.split(",",2);
                var time = splits[1];
                var splits2 = time.split(":",3);
                var val = Number(splits2[0])*3600+Number(splits2[1])*60+Number(splits2[2]);
                if(val>=lowBound && val<=upperBound){
                  flag=1;
                }
                break;
              }
          }
          if(flag==1){
            final.push(value);
            flag=0;
          }
        }
        res.send(final);
      }
    });
  };


/*
This function helps to upload excel file directly to the database in one go.
I am using read-excel-file module.
it iterates row by row first. since the first row contains header so to skip tha
i am using rows.shift() function

inside row interation, each row is array of cell conataining different attributes values.
so again i am iterating the cells and forming a new object based of defined schema.
after that i am appending that object in a list.

finally i am using inserMany() function which helps to updated the database.
it take list of object as its argument.

In the last i am sending a successfull message to ensure that its get uploaded successfully otherwise
it raises error.
*/
  
  const readXlsxFile = require('read-excel-file/node');
  export let fullUpload = (req: Request, res: Response) => {
    try{
      readXlsxFile(process.env.HOME + '/Desktop/PRAAN/src/controllers/test_dataset.xlsx').then((rows:any) => {
        // skip header
        rows.shift();
  
        let objs:any = [];
        var i = 0;
        rows.forEach((row:any) => {
          let obj = {
            device: row[0],
            t: row[1],
            w: row[2],
            h: row[3],
            p1: row[4],
            p25: row[5],
            p10: row[6]
          };
          var newInfo = new IS(obj);
          objs.push(newInfo);
          
      });
      IS.collection.insertMany(objs);
      res.send("successfuly added !!");
    });
    }catch(e){
      console.log(e);
      res.status(500).send({
      message: "Could not upload the file",
      });
    }
        
  };